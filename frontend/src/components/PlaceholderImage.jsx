const PlaceholderImage = ({ className = 'product-placeholder-svg' }) => (
    <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
    >
        <rect x="6" y="6" width="88" height="88" rx="8" stroke="#d1d5db" strokeWidth="3" />
        <path d="M16 72 L42 45 C45 42 50 42 53 45 L84 76" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M48 68 L60 56 C63 53 67 53 70 56 L84 70" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="68" cy="34" r="8" stroke="#d1d5db" strokeWidth="3" />
    </svg>
);

export default PlaceholderImage;
