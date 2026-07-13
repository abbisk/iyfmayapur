"use client"

import { useState } from "react"

/* ================= DONATION SCHEME ================= */
const schemes = [
  {
    title: "Gauranga Sevak",
    amount: "₹10,000+",
    image: "https://github.com/abbisk/Static/blob/abbisk/IYF/public/donation/Gauranga.jpg?raw=true",
  },
  {
    title: "Nityananda Sevak",
    amount: "₹5,000+",
    image: "https://github.com/abbisk/Static/blob/abbisk/IYF/public/donation/Nityanand.jpg?raw=true",
  },
  {
    title: "Adwaita Sevak",
    amount: "₹3,000+",
    image: "https://github.com/abbisk/Static/blob/abbisk/IYF/public/donation/Adwait.jpg?raw=true",
  },
  {
    title: "Gadadhar Sevak",
    amount: "₹1,000+",
    image: "https://github.com/abbisk/Static/blob/abbisk/IYF/public/donation/Gadadhar.jpg?raw=true",
  },
  {
    title: "Srivasa Sevak",
    amount: "< ₹1,000",
    image: "https://github.com/abbisk/Static/blob/abbisk/IYF/public/donation/Srivas.jpg?raw=true",
  },
]

/* ================= CATEGORIES ================= */
const categories = [
  {
    id: 1,
    title: "🐄 Gau Seva",
    desc: "Support cow protection & feeding",
    image: "https://images.unsplash.com/photo-1598514982846-1cf9a2f0e3c7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "🍛 Annadaan",
    desc: "Feed the needy & pilgrims",
    image: "https://images.unsplash.com/photo-1604908554161-c9d1d0dff78c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "🛕 Temple Seva",
    desc: "Maintain temple services",
    image: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?q=80&w=1200&auto=format&fit=crop",
  },
]

/* ================= MAIN COMPONENT ================= */
export default function Donation() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [amount, setAmount] = useState(0)

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">

      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        🙏 Donate for IYF Mayapur
      </h1>

      {/* ================= SCHEME ================= */}
      <h2 className="text-2xl font-semibold mb-6 text-center">
        🌸 Donation Scheme
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {schemes.map((scheme, index) => (
          <div
            key={index}
            className="rounded-2xl overflow-hidden shadow-lg bg-white/70 backdrop-blur-md border border-gray-200 hover:scale-105 transition"
          >
            <img
              src={scheme.image}
              alt={scheme.title}
              className="h-40 w-full object-cover"
            />

            <div className="p-4 text-center">
              <h3 className="text-xl font-bold">{scheme.title}</h3>
              <p className="text-green-600 font-semibold mt-1">
                {scheme.amount}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= CATEGORY ================= */}
      <h2 className="text-2xl font-semibold mb-6 text-center">
        🎯 Choose Seva
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat)}
            className={`cursor-pointer border rounded-2xl overflow-hidden shadow-md transition 
              ${selectedCategory?.id === cat.id ? "border-green-600 scale-105" : "hover:scale-105"}
            `}
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">{cat.title}</h2>
              <p className="text-gray-500 text-sm">{cat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DONATION ================= */}
      {selectedCategory && (
        <div className="mt-10 bg-white shadow-xl rounded-2xl p-6 border">

          <h2 className="text-2xl font-bold mb-4">
            Donate for {selectedCategory.title}
          </h2>

          <div className="flex flex-wrap gap-3 mb-4">
            {[101, 501, 1100, 2100].map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(amt)}
                className={`px-4 py-2 rounded-lg border 
                  ${amount === amt ? "bg-green-600 text-white" : "bg-gray-100"}
                `}
              >
                ₹{amt}
              </button>
            ))}
          </div>

          <input
            type="number"
            placeholder="Enter custom amount"
            className="w-full border p-3 rounded-lg mb-4"
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          <RazorApp amount={amount} category={selectedCategory.title} />
        </div>
      )}
    </div>
  )
}

/* ================= RAZORPAY ================= */

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

function RazorApp({ amount, category }) {
  async function displayRazorpay() {
    if (amount <= 0) {
      alert("Please select donation amount")
      return
    }

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      alert("Payment failed to load!")
      return
    }

    const data = await fetch("http://localhost:1769/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    }).then((t) => t.json())

    const options = {
      key: "YOUR_KEY_ID",
      amount: data.amount,
      currency: "INR",
      name: "IYF Mayapur",
      description: category,
      order_id: data.id,
      callback_url: "http://localhost:1769/verify",
      theme: { color: "#16a34a" },
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  return (
    <button
      onClick={displayRazorpay}
      className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition"
    >
      Donate ₹{amount || 0}
    </button>
  )
}