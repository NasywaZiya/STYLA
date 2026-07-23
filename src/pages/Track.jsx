import React, { useState, useEffect } from "react";
import { trackOrderByNumber } from "../api/orders";
import { useAuth } from "../context/AuthContext";
import { Package, Truck, CheckCircle2, Clock, CreditCard, Box } from "lucide-react";
import "./Track.css";

export default function Track() {
  const [resi, setResi] = useState("");
  const [trackData, setTrackData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) return;

    const params = new URLSearchParams(window.location.search);
    const initialOrderNumber = params.get("order_number");

    if (initialOrderNumber) {
      setResi(initialOrderNumber);
      handleTrack(initialOrderNumber);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // Reset halaman Track setiap status login berubah
    setResi("");
    setTrackData(null);
    setErrorMsg("");
    setLoading(false);

    // Hapus order_number dari URL
    window.history.replaceState({}, "", window.location.pathname);
  }, [isLoggedIn]);

  const handleTrack = async (orderNumberToTrack) => {
    const trackingNumber = typeof orderNumberToTrack === 'string' ? orderNumberToTrack : resi.trim();

    if (!trackingNumber) {
      setErrorMsg("Please enter an Order Number");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setTrackData(null);

    try {
      const data = await trackOrderByNumber(trackingNumber);
      setTrackData(data);
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "No order found with this order number."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Timeline configuration
  const timelineStages = [
    { id: "pending", label: "Pending", icon: <Clock size={16} /> },
    { id: "paid", label: "Paid", icon: <CreditCard size={16} /> },
    { id: "processing", label: "Processing", icon: <Box size={16} /> },
    { id: "shipped", label: "Shipped", icon: <Package size={16} /> },
    { id: "in_transit", label: "In Transit", icon: <Truck size={16} /> },
    { id: "completed", label: "Delivered", icon: <CheckCircle2 size={16} /> },
  ];

  const getTimelineProgress = (status) => {
    const statusMap = {
      pending: 0,
      paid: 1,
      processing: 2,
      packed: 2, // Map packed to processing
      shipped: 3,
      in_transit: 4,
      completed: 5,
      delivered: 5, // Map delivered to completed
      cancelled: -1
    };

    const currentIndex = statusMap[status?.toLowerCase()] ?? 0;

    if (currentIndex === -1) return -1; // Cancelled
    return currentIndex;
  };

  return (
    <section className="track-section">
      <div className="background-decor"></div>

      <div className="track-container">
        <h2>Track Your Order</h2>
        <p style={{ color: "#6b7280", marginBottom: "25px" }}>
          Follow your luxury pieces until they arrive.
        </p>

        <div className="track-input-group">
          <input
            type="text"
            value={resi}
            onChange={(e) => setResi(e.target.value)}
            placeholder="Enter Order Number (e.g. ORD-...)"
          />
          <button onClick={handleTrack} disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
            {loading ? "Searching..." : "Track Order"}
          </button>
        </div>

        {errorMsg && (
          <div style={{ marginTop: "15px", color: "#dc2626", backgroundColor: "#fef2f2", padding: "12px", borderRadius: "8px", textAlign: "left", fontSize: "0.95rem" }}>
            {errorMsg}
          </div>
        )}

        {trackData && (
          <div className="fade-in-animation">
            {/* Timeline View */}
            {trackData.order_status !== 'cancelled' ? (
              <div className="track-timeline">
                <div
                  className="track-timeline-progress"
                  style={{
                    width: `${(getTimelineProgress(
                      trackData.shipment_status || trackData.order_status
                    ) / (timelineStages.length - 1)) * 100}%`
                  }}
                ></div>

                {timelineStages.map((stage, index) => {
                  const currentIdx = getTimelineProgress(trackData.shipment_status || trackData.order_status);
                  const isActive = index === currentIdx;
                  const isCompleted = index <= currentIdx;

                  return (
                    <div
                      key={stage.id}
                      className={`timeline-step ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
                    >
                      <div className="timeline-circle">
                        {stage.icon}
                      </div>
                      <span className="timeline-label">{stage.label}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ padding: "20px", textAlign: "center", color: "#dc2626", fontWeight: "bold" }}>
                Order Cancelled
              </div>
            )}

            {/* Order Info */}
            <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", textAlign: "left", backgroundColor: "#f9fafb", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
              <div>
                <p style={{ margin: "0 0 5px 0", fontSize: "0.8rem", color: "#6b7280" }}>Order Number</p>
                <p style={{ margin: 0, fontWeight: "600", color: "#111827" }}>{trackData.order_number || trackData.order_id}</p>
              </div>
              <div>
                <p style={{ margin: "0 0 5px 0", fontSize: "0.8rem", color: "#6b7280" }}>Order Date</p>
                <p style={{ margin: 0, fontWeight: "500", color: "#111827" }}>{formatDate(trackData.order_date)}</p>
              </div>
              <div>
                <p style={{ margin: "0 0 5px 0", fontSize: "0.8rem", color: "#6b7280" }}>Courier</p>
                <p style={{ margin: 0, fontWeight: "500", color: "#111827" }}>{trackData.courier || "-"}</p>
              </div>
              <div>
                <p style={{ margin: "0 0 5px 0", fontSize: "0.8rem", color: "#6b7280" }}>Estimated Arrival</p>
                <p style={{ margin: 0, fontWeight: "500", color: "#111827" }}>{formatDate(trackData.estimated_arrival)}</p>
              </div>
            </div>

            {/* Product List */}
            {trackData.products && trackData.products.length > 0 && (
              <div className="track-products-wrapper">
                <h4 style={{ marginBottom: "15px", color: "#111827" }}>Purchased Items</h4>
                {trackData.products.map((product, idx) => (
                  <div key={idx} className="track-product-item">
                    <img src={product.image_url || "https://via.placeholder.com/60"} alt={product.product_name} />
                    <div className="track-product-info" style={{ flex: 1 }}>
                      <h5>{product.product_name}</h5>
                      <p>Variant: {product.color_code} | Size: {product.size}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontWeight: "600", margin: "0 0 5px 0", color: "#111827" }}>x{product.quantity}</p>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "#6b7280" }}>Rp {parseFloat(product.price).toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section >
  );
}
