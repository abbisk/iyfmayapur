"use client"

import { useEffect, useState } from "react"

export default function Store() {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])

  const books = [
    {
      id: 1,
      title: "Atomic Habits",
      price: 499,
      image: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg"
    },
    {
      id: 2,
      title: "Rich Dad Poor Dad",
      price: 399,
      image: "https://images-na.ssl-images-amazon.com/images/I/81bsw6fnUiL.jpg"
    },
    {
      id: 3,
      title: "The Psychology of Money",
      price: 450,
      image: "https://images-na.ssl-images-amazon.com/images/I/71g2ednj0JL.jpg"
    }
  ]

  /* ================= LOAD FROM STORAGE ================= */
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || []
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || []
    setCart(savedCart)
    setWishlist(savedWishlist)
  }, [])

  /* ================= SAVE TO STORAGE ================= */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  /* ================= CART LOGIC ================= */
  const addToCart = (book) => {
    const existing = cart.find((item) => item.id === book.id)

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === book.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      )
    } else {
      setCart([...cart, { ...book, qty: 1 }])
    }
  }

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    )
  }

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    )
  }

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  /* ================= WISHLIST ================= */
  const toggleWishlist = (book) => {
    if (wishlist.find((b) => b.id === book.id)) {
      setWishlist(wishlist.filter((b) => b.id !== book.id))
    } else {
      setWishlist([...wishlist, book])
    }
  }

  /* ================= TOTAL ================= */
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📚 Book Store</h1>

      {/* BOOK LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="border p-4 rounded-xl shadow-md">

            <img
              src={book.image}
              className="w-full h-60 object-cover rounded-md"
            />

            <h2 className="text-xl font-semibold mt-3">{book.title}</h2>
            <p className="text-gray-600">₹{book.price}</p>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => addToCart(book)}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg"
              >
                Add to Cart
              </button>

              <button onClick={() => toggleWishlist(book)}>
                {wishlist.find((b) => b.id === book.id) ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CART */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">🛒 Cart</h2>

        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-3 mb-2 rounded-lg"
            >
              <div>
                <p>{item.title}</p>
                <p>₹{item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => decreaseQty(item.id)} className="px-2 bg-gray-300">-</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item.id)} className="px-2 bg-gray-300">+</button>
              </div>

              <div>
                ₹{item.price * item.qty}
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500"
              >
                ❌
              </button>
            </div>
          ))
        )}

        <h3 className="text-xl font-bold mt-4">Total: ₹{total}</h3>
      </div>

      {/* PAYMENT */}
      <RazorApp amount={total} />
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

function RazorApp({ amount }) {

  async function displayRazorpay() {
    if (amount <= 0) {
      alert("Cart is empty!")
      return
    }

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      alert("Razorpay failed to load!")
      return
    }

    const data = await fetch("http://localhost:1769/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount })
    }).then((t) => t.json())

    const options = {
      key: "YOUR_KEY_ID",
      amount: data.amount,
      currency: "INR",
      name: "Book Store",
      description: "Book Purchase",
      order_id: data.id,
      callback_url: "http://localhost:1769/verify",
      theme: { color: "#3399cc" }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  return (
    <div className="mt-6">
      <button
        onClick={displayRazorpay}
        className="bg-green-600 text-white px-6 py-2 rounded-xl"
      >
        Pay ₹{amount}
      </button>
    </div>
  )
}