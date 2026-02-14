import { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    onSuccess: () => void;
}

const PaymentModal = ({ isOpen, onClose, amount, onSuccess }: PaymentModalProps) => {
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePay = () => {
        setProcessing(true);
        // Simulate Stripe API call
        setTimeout(() => {
            setProcessing(false);
            setSuccess(true);
            setTimeout(() => {
                onSuccess();
                setSuccess(false); // Reset for next time
            }, 1000);
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed', inset: 0, 
                    backgroundColor: 'rgba(26, 26, 26, 0.4)', // Cinematic Charcoal Overlay
                    backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
                }}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                        style={{ 
                            width: '100%', 
                            maxWidth: '440px', 
                            overflow: 'hidden',
                            borderRadius: '32px',
                            background: 'var(--color-surface-glass)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
                            backdropFilter: 'blur(20px)'
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>Secure Checkout</h2>
                            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', padding: '4px' }}>
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div style={{ padding: '2.5rem 2rem' }}>
                            {!success ? (
                                <>
                                    <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Total Amount</p>
                                        <h3 style={{ fontSize: '3rem', margin: 0, color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>₹{amount.toLocaleString()}</h3>
                                    </div>

                                    <form style={{ display: 'grid', gap: '1.25rem' }} onSubmit={(e) => e.preventDefault()}>
                                        <div style={{ position: 'relative' }}>
                                            <CreditCard size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
                                            <input 
                                                disabled 
                                                placeholder="Card Number" 
                                                value="•••• •••• •••• 4242"
                                                className="glass-input"
                                                style={{ 
                                                    width: '100%',
                                                    padding: '1rem 1rem 1rem 3.5rem',
                                                    borderRadius: '16px',
                                                    border: '1px solid rgba(26, 26, 26, 0.08)',
                                                    background: 'rgba(255, 255, 255, 0.2)',
                                                    fontSize: '1rem',
                                                    color: 'var(--color-text-primary)',
                                                    outline: 'none',
                                                    fontFamily: 'monospace'
                                                }} 
                                            />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <input 
                                                disabled 
                                                placeholder="MM/YY" 
                                                value="12/28"
                                                style={{ 
                                                    width: '100%',
                                                    padding: '1rem',
                                                    borderRadius: '16px',
                                                    border: '1px solid rgba(26, 26, 26, 0.08)',
                                                    background: 'rgba(255, 255, 255, 0.2)',
                                                    fontSize: '1rem',
                                                    color: 'var(--color-text-primary)',
                                                    outline: 'none',
                                                    textAlign: 'center'
                                                }} 
                                            />
                                            <input 
                                                disabled 
                                                placeholder="CVC" 
                                                value="•••"
                                                style={{ 
                                                    width: '100%',
                                                    padding: '1rem',
                                                    borderRadius: '16px',
                                                    border: '1px solid rgba(26, 26, 26, 0.08)',
                                                    background: 'rgba(255, 255, 255, 0.2)',
                                                    fontSize: '1rem',
                                                    color: 'var(--color-text-primary)',
                                                    outline: 'none',
                                                    textAlign: 'center'
                                                }} 
                                            />
                                        </div>
                                    </form>

                                    <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handlePay}
                                            disabled={processing}
                                            style={{ 
                                                width: '100%', 
                                                padding: '1.125rem', 
                                                background: 'var(--color-gold)', 
                                                color: 'var(--color-charcoal)', 
                                                border: 'none', 
                                                borderRadius: '32px', 
                                                fontSize: '1rem', 
                                                fontWeight: 800, 
                                                letterSpacing: '0.05em',
                                                display: 'flex', 
                                                justifyContent: 'center', 
                                                alignItems: 'center', 
                                                gap: '0.75rem',
                                                opacity: processing ? 0.8 : 1
                                            }}
                                        >
                                            {processing ? (
                                                'Processing...'
                                            ) : (
                                                <>Pay ₹{amount.toLocaleString()} <Lock size={16} /></>
                                            )}
                                        </motion.button>
                                        <button 
                                            onClick={onClose} 
                                            style={{ 
                                                width: '100%', 
                                                background: 'transparent', 
                                                border: 'none', 
                                                color: 'var(--color-text-secondary)', 
                                                fontSize: '0.9rem', 
                                                cursor: 'pointer',
                                                padding: '0.5rem'
                                            }}
                                        >
                                            Cancel Transaction
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ textAlign: 'center', padding: '2rem 0' }}
                                >
                                    <div style={{ display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', background: 'rgba(200, 163, 89, 0.1)', color: 'var(--color-gold)', marginBottom: '1.5rem' }}>
                                        <CheckCircle size={48} />
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>Payment Successful</h3>
                                    <p style={{ color: 'var(--color-text-secondary)' }}>Your journey has been confirmed.</p>
                                </motion.div>
                            )}
                        </div>
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.4)', padding: '1rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-tertiary)', borderTop: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <Lock size={12} />
                            256-bit SSL Encrypted. This is a secure test environment.
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;
