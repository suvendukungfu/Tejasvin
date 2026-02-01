import { useState } from 'react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    onSuccess: () => void;
}

const PaymentModal = ({ isOpen, onClose, amount, onSuccess }: PaymentModalProps) => {
    const [processing, setProcessing] = useState(false);

    if (!isOpen) return null;

    const handlePay = () => {
        setProcessing(true);
        // Simulate Stripe API call
        setTimeout(() => {
            setProcessing(false);
            console.log('Payment Succeeded');
            onSuccess();
        }, 2000);
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
        }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', width: '400px' }}>
                <h2 style={{ marginTop: 0 }}>Confirm & Pay</h2>
                <div style={{ margin: '1.5rem 0', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                        <span>Total Amount</span>
                        <span>₹{amount}</span>
                    </div>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {/* Mock Card Input */}
                    <input disabled placeholder="Card Number (Mock: 4242 4242...)" style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input disabled placeholder="MM/YY" style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                        <input disabled placeholder="CVC" style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                    <button onClick={onClose} style={{ flex: 1, padding: '0.8rem', border: '1px solid #ccc', backgroundColor: 'white', borderRadius: '4px' }}>Cancel</button>
                    <button
                        onClick={handlePay}
                        disabled={processing}
                        style={{ flex: 2, padding: '0.8rem', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                        {processing ? 'Processing...' : `Pay ₹${amount}`}
                    </button>
                </div>
                <small style={{ display: 'block', marginTop: '1rem', color: '#888', textAlign: 'center' }}>Test Mode: No real money charged.</small>
            </div>
        </div>
    );
};

export default PaymentModal;
