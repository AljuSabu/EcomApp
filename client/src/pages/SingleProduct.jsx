import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { toast } from "sonner";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Heart,
  Minus,
  PackageX,
  Plus,
  RotateCcw,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import AuthContext from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/card/ProductCard";
import { productPerks, productInfo } from "../data/data";

// Maps the string keys in data.js to actual icon components
const perkIcons = {
  truck: Truck,
  returns: RotateCcw,
  shield: ShieldCheck,
};

// Declared outside ProductDetail so it isn't recreated on every render
const AccordionItem = ({ section, isOpen, onToggle }) => (
  <div className="border-b border-zinc-100 last:border-b-0">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between py-4 text-left"
    >
      <span className="text-xs font-bold uppercase tracking-widest text-zinc-900">
        {section.title}
      </span>
      <ChevronDown
        size={16}
        className={`text-zinc-400 transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <ul className="space-y-3 pb-5">
            {section.points.map((point, i) => (
              <li
                key={i}
                className="flex items-start text-sm text-zinc-500 leading-relaxed"
              >
                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full mt-1.5 mr-3 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const SingleProduct = () => {
  const { slug } = useParams();
  const { auth } = useContext(AuthContext);
  const { cart, addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openSection, setOpenSection] = useState("details");

  // Load the product whenever the slug changes
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        setImageLoaded(false);
        setQuantity(1);
        setAdded(false);
        window.scrollTo({ top: 0 });

        const { data } = await axios.get(`/product/single-product/${slug}`);

        if (data?.product) {
          setProduct(data.product);
        } else {
          setProduct(null);
          setNotFound(true);
        }
      } catch (error) {
        console.log(error);
        setProduct(null);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [slug]);

  // Load other products from the same collection
  useEffect(() => {
    const collectionId = product?.collection?._id;

    if (!collectionId) {
      setRelated([]);
      return;
    }

    const getRelated = async () => {
      try {
        const { data } = await axios.post("/product/product-filter", {
          checked: [collectionId],
          radio: [],
        });
        if (data?.success) {
          setRelated(
            data.products.filter((p) => p._id !== product._id).slice(0, 4),
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    getRelated();
  }, [product]);

  // Derived stock + cart state
  const stock = Number(product?.stock ?? 0);
  const outOfStock = stock <= 0;
  const lowStock = stock > 0 && stock <= 5;

  const cartItem = product ? cart.find((p) => p._id === product._id) : null;
  const inCartQty = cartItem ? cartItem.quantity || 1 : 0;

  // How many more the customer can add without exceeding stock
  const maxAddable = Math.max(0, stock - inCartQty);
  const canAdd = !outOfStock && maxAddable > 0;
  const safeQty = Math.min(quantity, Math.max(1, maxAddable));

  const isWishlisted = product ? isInWishlist(product._id) : false;

  const handleAddToCart = () => {
    if (!auth?.user) {
      return toast.error("Please login to add items to cart");
    }
    if (!canAdd) return;

    addToCart(product, safeQty);
    toast.success(
      `${safeQty > 1 ? `${safeQty} x ` : ""}${product.name} added to bag`,
    );
    setAdded(true);
    setQuantity(1);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = () => {
    if (!auth?.user) {
      return toast.error("Please login to save items to your wishlist");
    }
    toggleWishlist(product);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch (error) {
      console.log(error);
      toast.error("Couldn't copy the link");
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="pt-10 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="h-4 bg-zinc-200 rounded w-32 mb-10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="aspect-4/5 bg-zinc-200 rounded-xl" />
            <div className="space-y-6">
              <div className="h-4 bg-zinc-200 rounded w-24" />
              <div className="h-10 bg-zinc-200 rounded w-3/4" />
              <div className="h-6 bg-zinc-200 rounded w-28" />
              <div className="h-24 bg-zinc-200 rounded" />
              <div className="h-14 bg-zinc-200 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not found state
  if (notFound || !product) {
    return (
      <div className="pt-10 pb-24 min-h-[60vh] flex items-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-white border border-zinc-100 rounded-xl p-16 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center mx-auto mb-4 text-zinc-400">
              <PackageX size={32} />
            </div>
            <h2 className="text-2xl font-serif text-zinc-900 mb-2">
              Product not found
            </h2>
            <p className="text-zinc-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              This product may have been removed or the link might be incorrect.
              Browse the catalog to find something similar.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-lg"
            >
              Explore Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Build the accordion sections (shared info from data.js)
  const sections = productInfo;

  return (
    <>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>

      <div className="pt-10 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/products"
            className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-10 group"
          >
            <ArrowLeft
              size={16}
              className="mr-2 group-hover:-translate-x-1 transition-transform"
            />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative aspect-4/5 bg-zinc-100 rounded-xl overflow-hidden border border-zinc-100 shadow-sm">
                {!imageLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-zinc-200" />
                )}
                <img
                  src={`http://localhost:4000/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />
                {outOfStock && (
                  <span className="absolute top-4 left-4 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                    Out of stock
                  </span>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  {product.collection?.name && (
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 mb-2 block">
                      {product.collection.name}
                    </span>
                  )}
                  <h1 className="text-4xl font-serif text-zinc-900 leading-tight">
                    {product.name}
                  </h1>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={handleWishlist}
                    aria-label={
                      isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                    title={
                      isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                    className={`w-11 h-11 flex items-center justify-center rounded-full border transition-colors ${
                      isWishlisted
                        ? "bg-rose-50 border-rose-200 text-rose-600"
                        : "bg-white border-zinc-200 text-zinc-500 hover:text-rose-500 hover:bg-zinc-50"
                    }`}
                  >
                    <Heart
                      size={18}
                      className={isWishlisted ? "fill-rose-500" : ""}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    aria-label="Copy link"
                    title="Copy link"
                    className="w-11 h-11 flex items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              <p className="text-2xl font-medium text-zinc-900 mb-3">
                ₹{product.price}
              </p>

              {/* Stock status */}
              <div className="mb-6">
                {outOfStock ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200/60">
                    Out of stock
                  </span>
                ) : lowStock ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200/60">
                    Only {stock} left
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    In stock
                  </span>
                )}
              </div>

              <p className="text-zinc-600 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Quantity */}
              {!outOfStock && (
                <div className="mb-8">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
                    Quantity
                  </h3>
                  <div className="inline-flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, safeQty - 1))}
                      disabled={safeQty <= 1}
                      className="p-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-5 text-sm font-bold min-w-12 text-center">
                      {safeQty}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(maxAddable, safeQty + 1))
                      }
                      disabled={safeQty >= maxAddable}
                      className="p-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* CTA */}
              <button
                onClick={handleAddToCart}
                disabled={!canAdd}
                className={`w-full py-4 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center shadow-sm disabled:cursor-not-allowed ${
                  added
                    ? "bg-emerald-600 text-white"
                    : "bg-black text-white hover:bg-zinc-800 disabled:bg-zinc-300"
                }`}
              >
                {added ? (
                  <>
                    <Check size={18} className="mr-2" />
                    Added to Bag
                  </>
                ) : outOfStock ? (
                  "Out of Stock"
                ) : !canAdd ? (
                  "Maximum Quantity in Bag"
                ) : (
                  <>
                    <ShoppingBag size={18} className="mr-2" />
                    Add to Bag
                  </>
                )}
              </button>

              {inCartQty > 0 && (
                <p className="text-xs text-zinc-500 mt-3 text-center">
                  You have {inCartQty} in your bag.{" "}
                  <Link
                    to="/dashboard/user/cart"
                    className="font-bold text-zinc-900 hover:underline"
                  >
                    View Bag
                  </Link>
                </p>
              )}

              {product.shipping === false && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200/60 rounded-lg px-3 py-2 mt-4">
                  Shipping isn't available for this item.
                </p>
              )}

              {/* Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10 mb-10">
                {productPerks.map((perk) => {
                  const Icon = perkIcons[perk.icon];
                  return (
                    <div
                      key={perk.id}
                      className="bg-zinc-50 rounded-xl border border-zinc-100 p-4"
                    >
                      {Icon && (
                        <Icon size={18} className="text-zinc-900 mb-2" />
                      )}
                      <p className="text-xs font-bold text-zinc-900 mb-1">
                        {perk.title}
                      </p>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        {perk.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Accordion */}
              <div className="bg-white rounded-xl border border-zinc-100 shadow-sm px-6">
                {sections.map((section) => (
                  <AccordionItem
                    key={section.id}
                    section={section}
                    isOpen={openSection === section.id}
                    onToggle={() =>
                      setOpenSection(
                        openSection === section.id ? null : section.id,
                      )
                    }
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-24">
              <div className="mb-8">
                <h2 className="text-3xl font-serif mb-2">You May Also Like</h2>
                <p className="text-zinc-500 text-sm">
                  More from {product.collection?.name}.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {related.map((item) => (
                  <ProductCard key={item._id} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
