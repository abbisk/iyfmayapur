import { useEffect, useMemo, useState } from "react";
import {
  FiArrowRight,
  FiBookOpen,
  FiCheck,
  FiHeart,
  FiMinus,
  FiPlus,
  FiSearch,
  FiShoppingBag,
  FiStar,
  FiTrash2,
  FiX,
} from "react-icons/fi";

const books = [
  {
    id: "bg-as-it-is",
    title: "Bhagavad-gītā As It Is",
    category: "Bhagavad-gītā",
    format: "Hardcover",
    price: 499,
    originalPrice: 599,
    rating: "4.9",
    badge: "Bestseller",
    coverPosition: "0% 0%",
    description: "The complete edition with original Sanskrit, translations, and illuminating purports.",
  },
  {
    id: "srimad-bhagavatam",
    title: "Śrīmad-Bhāgavatam — Canto 1",
    category: "Śrīmad-Bhāgavatam",
    format: "Hardcover",
    price: 699,
    originalPrice: 799,
    rating: "4.9",
    badge: "Essential",
    coverPosition: "50% 0%",
    description: "The timeless narration of spiritual history, philosophy, devotion, and divine wisdom.",
  },
  {
    id: "science-self-realization",
    title: "The Science of Self-Realization",
    category: "Wisdom",
    format: "Paperback",
    price: 249,
    originalPrice: 299,
    rating: "4.8",
    badge: "Reader favourite",
    coverPosition: "100% 0%",
    description: "Clear conversations and essays addressing life, consciousness, meditation, and the self.",
  },
  {
    id: "nectar-devotion",
    title: "The Nectar of Devotion",
    category: "Bhakti-yoga",
    format: "Paperback",
    price: 399,
    originalPrice: 449,
    rating: "4.8",
    badge: "Bhakti classic",
    coverPosition: "0% 100%",
    description: "A practical and profound guide to the complete science of devotional service.",
  },
  {
    id: "teachings-caitanya",
    title: "Teachings of Lord Caitanya",
    category: "Bhakti-yoga",
    format: "Hardcover",
    price: 449,
    originalPrice: 525,
    rating: "4.9",
    badge: "Classic",
    coverPosition: "50% 100%",
    description: "The essential teachings of Śrī Caitanya Mahāprabhu presented with clarity and depth.",
  },
  {
    id: "krsna-book",
    title: "Kṛṣṇa — The Supreme Personality of Godhead",
    category: "Kṛṣṇa Book",
    format: "Hardcover",
    price: 599,
    originalPrice: 699,
    rating: "5.0",
    badge: "Family favourite",
    coverPosition: "100% 100%",
    description: "A captivating narration of Lord Kṛṣṇa’s extraordinary pastimes and teachings.",
  },
];

const categories = ["All books", "Bhagavad-gītā", "Śrīmad-Bhāgavatam", "Bhakti-yoga", "Wisdom", "Kṛṣṇa Book"];

const readStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  } catch {
    return [];
  }
};

export default function Store() {
  const [cart, setCart] = useState(() => readStorage("prabhupada-book-cart"));
  const [wishlist, setWishlist] = useState(() => readStorage("prabhupada-book-wishlist"));
  const [activeCategory, setActiveCategory] = useState("All books");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("prabhupada-book-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("prabhupada-book-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const filteredBooks = useMemo(() => {
    const term = search.trim().toLowerCase();
    return books.filter((book) => {
      const matchesCategory = activeCategory === "All books" || book.category === activeCategory;
      const matchesSearch = !term || `${book.title} ${book.category} ${book.description}`.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;

  const addToCart = (book) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === book.id);
      return existing
        ? current.map((item) => item.id === book.id ? { ...item, qty: item.qty + 1 } : item)
        : [...current, { ...book, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id, change) => {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, qty: item.qty + change } : item)
      .filter((item) => item.qty > 0));
  };

  const toggleWishlist = (book) => {
    setWishlist((current) => current.some((item) => item.id === book.id)
      ? current.filter((item) => item.id !== book.id)
      : [...current, book]);
  };

  return (
    <div className="book-store-page">
      <section className="book-store-hero">
        <img src="/store/prabhupada-books-hero.png" alt="A collection of devotional books" />
        <div className="book-store-shell book-store-hero__content">
          <p className="book-store-eyebrow">Transcendental literature</p>
          <h1>Books by<br />Śrīla Prabhupāda</h1>
          <p>Timeless wisdom for a thoughtful, joyful, and spiritually fulfilled life.</p>
          <a href="#book-collection">Explore the collection <FiArrowRight /></a>
        </div>
      </section>

      <section className="book-store-benefits book-store-shell" aria-label="Store benefits">
        <div><span><FiBookOpen /></span><p><strong>Authentic editions</strong><small>Original teachings and purports</small></p></div>
        <div><span><FiShoppingBag /></span><p><strong>Carefully packed</strong><small>Books delivered with care</small></p></div>
        <div><span><FiCheck /></span><p><strong>Free shipping</strong><small>On orders above ₹999</small></p></div>
      </section>

      <section className="book-store-shell book-collection" id="book-collection">
        <div className="book-collection__header">
          <div>
            <p className="book-store-eyebrow">The Bhaktivedanta library</p>
            <h2>Find your next book</h2>
          </div>
          <button type="button" className="book-cart-button" onClick={() => setCartOpen(true)}>
            <FiShoppingBag /> Cart <span>{cartCount}</span>
          </button>
        </div>

        <div className="book-store-toolbar">
          <div className="book-store-categories">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={activeCategory === category ? "is-active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="book-store-search">
            <FiSearch />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search books" />
          </label>
        </div>

        {filteredBooks.length ? (
          <div className="book-grid">
            {filteredBooks.map((book) => {
              const wished = wishlist.some((item) => item.id === book.id);
              return (
                <article className="book-card" key={book.id}>
                  <div className="book-card__visual">
                    <span className="book-card__badge">{book.badge}</span>
                    <button
                      type="button"
                      className={`book-card__heart ${wished ? "is-active" : ""}`}
                      onClick={() => toggleWishlist(book)}
                      aria-label={wished ? `Remove ${book.title} from wishlist` : `Add ${book.title} to wishlist`}
                    >
                      <FiHeart />
                    </button>
                    <div
                      className="book-card__cover"
                      role="img"
                      aria-label={`Illustrated cover for ${book.title}`}
                      style={{ backgroundPosition: book.coverPosition }}
                    />
                    <span className="book-card__cover-title">{book.title}</span>
                  </div>
                  <div className="book-card__body">
                    <p className="book-card__category">{book.category} · {book.format}</p>
                    <h3>{book.title}</h3>
                    <p className="book-card__description">{book.description}</p>
                    <div className="book-card__rating"><FiStar /> <strong>{book.rating}</strong> <span>Reader rating</span></div>
                    <div className="book-card__footer">
                      <p><strong>₹{book.price}</strong><del>₹{book.originalPrice}</del></p>
                      <button type="button" onClick={() => addToCart(book)}><FiShoppingBag /> Add</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="book-store-empty-search"><FiBookOpen /><h3>No books found</h3><p>Try another title or category.</p></div>
        )}
      </section>

      {cartOpen && <button type="button" className="book-cart-overlay" onClick={() => setCartOpen(false)} aria-label="Close cart" />}
      <aside className={`book-cart-drawer ${cartOpen ? "is-open" : ""}`} aria-hidden={!cartOpen}>
        <div className="book-cart-drawer__header">
          <div><p>Your cart</p><span>{cartCount} {cartCount === 1 ? "book" : "books"}</span></div>
          <button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart"><FiX /></button>
        </div>

        <div className="book-cart-drawer__items">
          {cart.length === 0 ? (
            <div className="book-cart-empty"><FiShoppingBag /><h3>Your cart is empty</h3><p>Discover a book to begin your spiritual library.</p><button type="button" onClick={() => setCartOpen(false)}>Continue browsing</button></div>
          ) : cart.map((item) => (
            <div className="book-cart-item" key={item.id}>
              <div className="book-cart-item__cover" style={{ backgroundPosition: item.coverPosition }} />
              <div className="book-cart-item__info">
                <strong>{item.title}</strong>
                <span>{item.format}</span>
                <div className="book-cart-item__bottom">
                  <div className="book-quantity">
                    <button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label={`Decrease ${item.title} quantity`}><FiMinus /></button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase ${item.title} quantity`}><FiPlus /></button>
                  </div>
                  <strong>₹{item.price * item.qty}</strong>
                </div>
              </div>
              <button type="button" className="book-cart-item__remove" onClick={() => setCart((current) => current.filter((book) => book.id !== item.id))} aria-label={`Remove ${item.title}`}><FiTrash2 /></button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="book-cart-summary">
            <p><span>Subtotal</span><strong>₹{subtotal}</strong></p>
            <p><span>Shipping</span><strong>{shipping === 0 ? "Free" : `₹${shipping}`}</strong></p>
            <div><span>Total</span><strong>₹{total}</strong></div>
            <CheckoutButton amount={total} />
            <small>Secure checkout · Prices include applicable taxes</small>
          </div>
        )}
      </aside>
    </div>
  );
}

function loadScript(src) {
  return new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return resolve(true);
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function CheckoutButton({ amount }) {
  const displayRazorpay = async () => {
    const loaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!loaded) {
      window.alert("The secure checkout could not be loaded. Please try again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:1769/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await response.json();
      const payment = new window.Razorpay({
        key: "YOUR_KEY_ID",
        amount: data.amount,
        currency: "INR",
        name: "IYF Mayapur Book Store",
        description: "Śrīla Prabhupāda book purchase",
        order_id: data.id,
        callback_url: "http://localhost:1769/verify",
        theme: { color: "#8b3f27" },
      });
      payment.open();
    } catch {
      window.alert("Checkout is not connected yet. Please start the payment server and try again.");
    }
  };

  return <button type="button" className="book-checkout-button" onClick={displayRazorpay}>Proceed to checkout <FiArrowRight /></button>;
}
