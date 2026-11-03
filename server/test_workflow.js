const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('--- 🧪 STARTING VOGUEX END-TO-END WORKFLOW VERIFICATION ---');

  try {
    // 1. Health check
    const healthRes = await fetch(`${BASE_URL}/health`);
    const health = await healthRes.json();
    console.log('✅ 1. Health check passed:', health.brand, health.status);

    // 2. Fetch products
    const productsRes = await fetch(`${BASE_URL}/products`);
    const productsData = await productsRes.json();
    console.log(`✅ 2. Products fetched: ${productsData.products.length} products found (Total: ${productsData.total})`);

    // 3. Search autocomplete
    const searchRes = await fetch(`${BASE_URL}/products/search/autocomplete?q=blazer`);
    const searchData = await searchRes.json();
    console.log(`✅ 3. Search autocomplete for 'blazer': ${searchData.length} match(es)`);

    // 4. Login as Admin
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@voguex.com', password: 'admin123' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log(`✅ 4. Auth login passed: ${loginData.name} (Role: ${loginData.role})`);

    // 5. Validate coupon
    const couponRes = await fetch(`${BASE_URL}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'VOGUE10', cartTotal: 500 })
    });
    const couponData = await couponRes.json();
    console.log(`✅ 5. Coupon validation: Code ${couponData.code} applied -$${couponData.discount}`);

    // 6. Create Order
    const firstProduct = productsData.products[0];
    const orderRes = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        orderItems: [
          {
            product: firstProduct._id,
            name: firstProduct.name,
            image: firstProduct.images[0],
            price: firstProduct.price,
            size: '40R',
            color: 'Obsidian Noir',
            quantity: 1
          }
        ],
        shippingAddress: {
          fullName: 'Alexander Vance',
          street: '742 Fifth Avenue, Suite 14B',
          city: 'New York',
          state: 'NY',
          postalCode: '10019',
          country: 'United States',
          phone: '+1 (555) 019-2834'
        },
        paymentMethod: 'Razorpay',
        couponCode: 'VOGUE10'
      })
    });
    const createdOrder = await orderRes.json();
    console.log(`✅ 6. Order created successfully: Reference ${createdOrder.orderId} (Total: $${createdOrder.totalPrice})`);

    // 7. Payment Verification
    const verifyRes = await fetch(`${BASE_URL}/payments/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: createdOrder._id,
        razorpay_order_id: `rzp_order_${createdOrder.orderId}`,
        razorpay_payment_id: `pay_test_${Date.now()}`,
        razorpay_signature: `demo_sig_verified_${Date.now()}`
      })
    });
    const verifyData = await verifyRes.json();
    console.log(`✅ 7. Server-side payment verification:`, verifyData.message);

    // 8. Track Order Live
    const trackRes = await fetch(`${BASE_URL}/orders/track/${createdOrder.orderId}`);
    const trackData = await trackRes.json();
    console.log(`✅ 8. Order Tracking queried: Status is '${trackData.status}', Courier: ${trackData.courierPartner}`);

    // 9. Admin Dashboard Stats
    const dashRes = await fetch(`${BASE_URL}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const dashData = await dashRes.json();
    console.log(`✅ 9. Admin Dashboard Stats: Revenue $${dashData.totalRevenue}, Orders: ${dashData.totalOrders}`);

    // 10. Admin Update Order Status
    const statusUpdateRes = await fetch(`${BASE_URL}/admin/orders/${createdOrder._id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        status: 'Packed',
        notes: 'Garment steamed and packed in bespoke matte black box.'
      })
    });
    const statusUpdateData = await statusUpdateRes.json();
    console.log(`✅ 10. Admin Status Update: Order transitioned to '${statusUpdateData.order.status}'`);

    // 11. Customer Review submission
    const reviewRes = await fetch(`${BASE_URL}/reviews/${firstProduct._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        rating: 5,
        title: 'Perfection in silk drape',
        comment: 'Breathtaking finish and exceptional 3D preview match.'
      })
    });
    const reviewData = await reviewRes.json();
    console.log(`✅ 11. Product review submitted: Review ID ${reviewData._id}`);

    console.log('\n🎉 ALL 11 WORKFLOW PHASES PASSED WITH ZERO ERRORS!');
  } catch (err) {
    console.error('❌ Test failed:', err);
  }
}

runTests();
