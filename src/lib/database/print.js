


export const generateReceipt = (order) => {
  if (!order) return;
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  const orderDate = new Date(order.createdAt || Date.now());
  const formattedDate = orderDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const formattedTime = orderDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const receiptContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Receipt #${order._id}</title>
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
        <style>
          @page { size: 80mm auto; margin: 0; }
          body {
            font-family: 'DM Sans', sans-serif;
            color: #1a1a2e;
            font-size: 10.5px;
            width: 76mm;
            margin: 0 auto;
            padding: 6mm 3mm 8mm;
          }
          .header { text-align: center; padding-bottom: 10px; margin-bottom: 10px; border-bottom: 2px solid #1a1a2e; }
          .store-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; margin: 0; }
          .store-contact { font-family: 'DM Mono', monospace; font-size: 8px; color: #9ca3af; margin: 2px 0; }
          .meta-section { padding: 8px 0; border-bottom: 1px dashed #d1d5db; margin-bottom: 8px; }
          .meta-row { display: flex; justify-content: space-between; padding: 1px 0; }
          .meta-label { font-size: 8px; color: #9ca3af; text-transform: uppercase; }
          .meta-value { font-family: 'DM Mono', monospace; font-size: 9px; }
          .items-header { display: grid; grid-template-columns: 1fr 26px 54px; border-top: 1px solid #1a1a2e; border-bottom: 1px solid #1a1a2e; padding: 4px 0; font-weight: 700; font-size: 8px; text-transform: uppercase; }
          .item-row { display: grid; grid-template-columns: 1fr 26px 54px; gap: 4px; padding: 5px 0; border-bottom: 1px dashed #e5e7eb; }
          .item-name { font-weight: 600; display: block; }
          .item-price-line { font-family: 'DM Mono', monospace; font-size: 8px; color: #6b7280; }
          .total-row { display: flex; justify-content: space-between; padding: 2px 0; font-family: 'DM Mono', monospace; }
          .net-total-row { display: flex; justify-content: space-between; align-items: baseline; margin-top: 5px; padding-top: 5px; border-top: 1px solid #1a1a2e; }
          .net-label { font-weight: 700; text-transform: uppercase; font-size: 10px; }
          .net-value { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; }
          .barcode-area { margin: 15px auto 0; text-align: center; }
          .bar { background: #1a1a2e; display: inline-block; margin-right: 1px; }
          .footer { margin-top: 14px; text-align: center; border-top: 1px dashed #d1d5db; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <p class="store-name">Sara's Dine</p>
          <p class="store-contact">Mymensingh</p>
          <p class="receipt-type">— Sales Receipt —</p>
        </div>

        <div class="meta-section">
          <div class="meta-row"><span>Receipt No.</span><span class="meta-value">#${order._id.toString().slice(-6).toUpperCase()}</span></div>
          <div class="meta-row"><span>Date</span><span class="meta-value">${formattedDate}</span></div>
          <div class="meta-row"><span>Time</span><span class="meta-value">${formattedTime}</span></div>
          <div class="meta-row"><span>Customer</span><span class="meta-value">${order.name}</span></div>
        </div>

        <div class="items-header"><span>Description</span><span style="text-align:center">Qty</span><span style="text-align:right">Total</span></div>

        ${order.items.map((item) => `
          <div class="item-row">
            <div>
              <span class="item-name">${item.title}</span>
              <span class="item-price-line">@ ৳${item.price.toFixed(2)} ${item.discount > 0 ? `(-৳${item.discount})` : ''}</span>
            </div>
            <div style="text-align:center; font-family: 'DM Mono'">${item.quantity}</div>
            <div style="text-align:right; font-family: 'DM Mono'; font-weight:600">৳${((item.price - item.discount) * item.quantity).toFixed(2)}</div>
          </div>
        `).join('')}

        <div style="margin-top: 10px">
          <div class="total-row"><span>Subtotal</span><span>৳${order.subTotal.toFixed(2)}</span></div>
          <div class="total-row" style="color: #dc2626"><span>Discount</span><span>-৳${order.totalDiscount.toFixed(2)}</span></div>
          <div class="net-total-row">
            <span class="net-label">Net Total</span>
            <span class="net-value">৳${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div class="barcode-area">
          <div style="height: 20px overflow: hidden">
            ${Array.from({ length: 30 }, () => `<span class="bar" style="height:${Math.floor(Math.random() * 10) + 15}px; width: ${Math.random() > 0.5 ? '1px' : '2px'}"></span>`).join('')}
          </div>
          <div style="font-family: 'DM Mono'; font-size: 7px; color: #9ca3af; margin-top: 4px">ID: ${order._id}</div>
        </div>

        <div class="footer">
          <p style="font-family: 'Playfair Display'; font-size: 12px">Thank you for shopping!</p>
          <p style="font-size: 7px; color: #9ca3af">Powered by Disibin</p>
        </div>
      </body>
    </html>
  `;

  const pri = iframe.contentWindow;
  pri.document.open();
  pri.document.write(receiptContent);
  pri.document.close();

  setTimeout(() => {
    pri.focus();
    pri.print();
    document.body.removeChild(iframe);
  }, 500);
};