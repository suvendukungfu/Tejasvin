import { useState } from 'react';
import { X, CreditCard, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    onSuccess: () => void;
}

const PaymentModal = ({ isOpen, onClose, amount, onSuccess }: PaymentModalProps) => {
    const [processing, setProcessing] = useState(false);

    const handlePay = () => {
        setProcessing(true);
        // Simulate Stripe API call
        setTimeout(() => {
            setProcessing(false);
            onSuccess();
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed', inset: 0, 
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
                }}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="card"
                        style={{ padding: 0, width: '100%', maxWidth: '420px', overflow: 'hidden' }}
                    >
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Secure Payment</h2>
                            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div style={{ padding: '2rem' }}>
                            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Total Amount</p>
                                <h3 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--color-primary)' }}>₹{amount}</h3>
                            </div>

                            <form style={{ display: 'grid', gap: '1.25rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <CreditCard size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
                                    <input 
                                        disabled 
                                        placeholder="Card Number (Mock: 4242 4242...)" 
                                        className="modern-input"
                                        style={{ paddingLeft: '3rem' }} 
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <input 
                                        disabled 
                                        placeholder="MM/YY" 
                                        className="modern-input"
                                    />
                                    <input 
                                        disabled 
                                        placeholder="CVC" 
                                        className="modern-input"
                                    />
                                </div>
                            </form>

                            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <button
                                    onClick={handlePay}
                                    disabled={processing}
                                    className="btn btn-primary"
                                    style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    {processing ? 'Processing Payment...' : <>Pay ₹{amount} <Lock size={16} /></>}
                                </button>
                                <button 
                                    onClick={onClose} 
                                    className="btn btn-outline"
                                    style={{ width: '100%', border: 'none' }}
                                >
                                    Cancel Transaction
                                </button>
                            </div>
                        </div>
                        <div style={{ backgroundColor: '#f9f9f9', padding: '1rem', textAlign: 'center', fontSize: '0.8rem', color: '#888', borderTop: '1px solid #eee' }}>
                            <Lock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                            Encrypted & Secure. This is a test mode.
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;
