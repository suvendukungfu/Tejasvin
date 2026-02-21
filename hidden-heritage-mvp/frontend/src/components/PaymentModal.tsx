import { useState, useEffect, useCallback } from 'react';
import { createPaymentIntent } from '../services/api';
import { X, CreditCard, Lock, CheckCircle, Shield, Wifi, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    onSuccess: () => void;
}

// --- Design Tokens (aligned with index.css VisionOS Heritage v3.0) ---
const T = {
    bg: '#EAE5DB',
    ivory: '#FFFFF8',
    void: '#1C1917',
    accent: '#B08D55',
    accentLight: 'rgba(176, 141, 85, 0.12)',
    textPrimary: '#1C1917',
    textSecondary: 'rgba(28, 25, 23, 0.65)',
    textTertiary: 'rgba(28, 25, 23, 0.4)',
    glass: 'rgba(255, 255, 248, 0.65)',
    glassHeavy: 'rgba(255, 255, 248, 0.85)',
    border: 'rgba(28, 25, 23, 0.08)',
    borderFocus: 'rgba(176, 141, 85, 0.5)',
    shadowFloat: '0 16px 48px -12px rgba(28, 25, 23, 0.12)',
    shadowDeep: '0 32px 64px -16px rgba(28, 25, 23, 0.18)',
    radiusLg: '32px',
    radiusMd: '20px',
    radiusSm: '12px',
    fontDisplay: "'Playfair Display', serif",
    fontSans: "'Inter', system-ui, sans-serif",
    ease: 'cubic-bezier(0.2, 0, 0, 1)',
    success: '#2D8A56',
    successBg: 'rgba(45, 138, 86, 0.08)',
    error: '#C53030',
    errorBg: 'rgba(197, 48, 48, 0.06)',
};

// --- Card brand detection ---
const getCardBrand = (num: string): { name: string; color: string; gradient: string } => {
    const d = num.replace(/\s/g, '');
    if (d.startsWith('4')) return { name: 'VISA', color: '#1A1F71', gradient: 'linear-gradient(135deg, #1A1F71 0%, #2D47B0 100%)' };
    if (d.startsWith('5') || d.startsWith('2')) return { name: 'MASTERCARD', color: '#EB001B', gradient: 'linear-gradient(135deg, #EB001B 0%, #F79E1B 100%)' };
    if (d.startsWith('3')) return { name: 'AMEX', color: '#006FCF', gradient: 'linear-gradient(135deg, #006FCF 0%, #00A5E5 100%)' };
    if (d.startsWith('6')) return { name: 'DISCOVER', color: '#FF6000', gradient: 'linear-gradient(135deg, #FF6000 0%, #FFA040 100%)' };
    return { name: '', color: T.textTertiary, gradient: `linear-gradient(135deg, ${T.void} 0%, #3A3530 100%)` };
};

// --- Formatters ---
const fmtCard = (val: string): string => {
    const v = val.replace(/\D/g, '').substring(0, 16);
    const parts: string[] = [];
    for (let i = 0; i < v.length; i += 4) parts.push(v.substring(i, i + 4));
    return parts.join(' ');
};

const fmtExpiry = (val: string): string => {
    const v = val.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 3) return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    return v;
};

// --- Subcomponents ---

const VisualCard = ({ name, number, expiry, cvc, showCvc }: { name: string; number: string; expiry: string; cvc: string; showCvc: boolean }) => {
    const brand = getCardBrand(number);
    const displayNum = number || '•••• •••• •••• ••••';
    const displayName = name || 'CARDHOLDER NAME';
    const displayExpiry = expiry || '••/••';

    return (
        <motion.div
            style={{
                width: '100%',
                maxWidth: '340px',
                aspectRatio: '1.586 / 1',
                borderRadius: '16px',
                padding: '1.5rem',
                background: brand.gradient,
                boxShadow: '0 20px 60px -15px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1) inset',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                margin: '0 auto',
                perspective: '1000px',
            }}
            initial={{ rotateY: showCvc ? 0 : 0 }}
            animate={{ rotateY: showCvc ? 8 : 0, rotateX: showCvc ? -3 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
            {/* Holographic overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(125deg, rgba(255,255,255,0.15) 0%, transparent 40%, rgba(255,255,255,0.05) 60%, transparent 100%)',
                pointerEvents: 'none',
            }} />
            {/* Chip + Contactless */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                <div style={{
                    width: '42px', height: '30px', borderRadius: '6px',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F0D780 50%, #D4AF37 100%)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }} />
                <Wifi size={20} style={{ color: 'rgba(255,255,255,0.6)', transform: 'rotate(90deg)' }} />
            </div>

            {/* Card Number */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{
                    fontFamily: 'monospace', fontSize: '1.2rem', letterSpacing: '0.18em',
                    color: 'rgba(255,255,255,0.95)', margin: 0, fontWeight: 500,
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}>
                    {displayNum}
                </p>
            </div>

            {/* Bottom Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 1 }}>
                <div>
                    <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>
                        Card Holder
                    </p>
                    <p style={{
                        fontSize: '0.75rem', color: 'rgba(255,255,255,0.9)', margin: 0,
                        textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500,
                        maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                        {displayName}
                    </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>
                        {showCvc ? 'CVC' : 'Expires'}
                    </p>
                    <p style={{
                        fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', margin: 0,
                        fontFamily: 'monospace', letterSpacing: '0.1em',
                    }}>
                        {showCvc ? (cvc || '•••') : displayExpiry}
                    </p>
                </div>
                {brand.name && (
                    <div style={{
                        position: 'absolute', right: 0, bottom: '-4px',
                        fontSize: '0.65rem', fontWeight: 800, color: 'rgba(255,255,255,0.7)',
                        letterSpacing: '0.15em',
                    }}>
                        {brand.name}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const FloatingInput = ({
    label, value, onChange, disabled, icon, maxLength, type = 'text',
    style: customStyle, valid, monospace,
}: {
    label: string; value: string; onChange: (v: string) => void; disabled?: boolean;
    icon?: React.ReactNode; maxLength?: number; type?: string;
    style?: React.CSSProperties; valid?: boolean; monospace?: boolean;
}) => {
    const [focused, setFocused] = useState(false);
    const isActive = focused || value.length > 0;

    return (
        <div style={{ position: 'relative', ...customStyle }}>
            {icon && (
                <div style={{
                    position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
                    color: focused ? T.accent : T.textTertiary, transition: 'color 0.3s', zIndex: 2,
                    display: 'flex', alignItems: 'center',
                }}>
                    {icon}
                </div>
            )}
            <input
                type={type}
                disabled={disabled}
                value={value}
                maxLength={maxLength}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                    width: '100%',
                    padding: icon ? '1.1rem 2.75rem 0.6rem 2.75rem' : '1.1rem 1.25rem 0.6rem 1.25rem',
                    borderRadius: T.radiusSm,
                    border: `1.5px solid ${focused ? T.borderFocus : valid ? T.success : T.border}`,
                    background: focused ? 'rgba(255, 255, 248, 0.9)' : 'rgba(255, 255, 248, 0.5)',
                    fontSize: '1rem',
                    color: T.textPrimary,
                    outline: 'none',
                    fontFamily: monospace ? 'monospace' : T.fontSans,
                    letterSpacing: monospace ? '0.12em' : 'normal',
                    transition: 'all 0.35s cubic-bezier(0.2, 0, 0, 1)',
                    boxShadow: focused ? `0 0 0 4px rgba(176, 141, 85, 0.08)` : 'none',
                }}
            />
            <motion.label
                animate={{
                    top: isActive ? '6px' : '50%',
                    fontSize: isActive ? '0.65rem' : '0.9rem',
                    y: isActive ? 0 : '-50%',
                }}
                transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                style={{
                    position: 'absolute',
                    left: icon ? '2.75rem' : '1.25rem',
                    color: focused ? T.accent : T.textTertiary,
                    pointerEvents: 'none',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    textTransform: isActive ? 'uppercase' : 'none',
                    zIndex: 1,
                }}
            >
                {label}
            </motion.label>
            {valid && value.length > 0 && (
                <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: T.success }}
                >
                    <CheckCircle size={16} />
                </motion.div>
            )}
        </div>
    );
};

// --- Processing Steps ---
const PROCESSING_STEPS = [
    { label: 'Authenticating', icon: Shield },
    { label: 'Verifying', icon: Eye },
    { label: 'Confirming', icon: Lock },
];

const ProcessingAnimation = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev < PROCESSING_STEPS.length - 1 ? prev + 1 : prev));
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', padding: '3rem 1rem' }}
        >
            {/* Pulsing ring */}
            <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 2rem' }}>
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute', inset: '-8px', borderRadius: '50%',
                        border: `2px solid ${T.accent}`,
                    }}
                />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    style={{
                        width: '80px', height: '80px', borderRadius: '50%',
                        border: `3px solid ${T.border}`,
                        borderTopColor: T.accent,
                    }}
                />
                <div style={{
                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <Lock size={20} color={T.accent} />
                </div>
            </div>

            {/* Progress bar */}
            <div style={{
                width: '100%', maxWidth: '240px', height: '3px', background: T.border,
                borderRadius: '2px', margin: '0 auto 2rem', overflow: 'hidden',
            }}>
                <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${((step + 1) / PROCESSING_STEPS.length) * 100}%` }}
                    transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
                    style={{ height: '100%', background: T.accent, borderRadius: '2px' }}
                />
            </div>

            {/* Steps */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                {PROCESSING_STEPS.map((s, i) => {
                    const Icon = s.icon;
                    const isActive = i === step;
                    const isDone = i < step;
                    return (
                        <motion.div
                            key={s.label}
                            animate={{ opacity: isDone || isActive ? 1 : 0.3 }}
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                            }}
                        >
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                background: isDone ? T.successBg : isActive ? T.accentLight : 'transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: `1.5px solid ${isDone ? T.success : isActive ? T.accent : T.border}`,
                            }}>
                                {isDone ? <CheckCircle size={14} color={T.success} /> : <Icon size={14} color={isActive ? T.accent : T.textTertiary} />}
                            </div>
                            <span style={{
                                fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                color: isDone ? T.success : isActive ? T.accent : T.textTertiary,
                            }}>
                                {s.label}
                            </span>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

const SuccessView = ({ amount, lastFour }: { amount: number; lastFour: string }) => {
    const txnId = `HH-${Date.now().toString(36).toUpperCase()}`;
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{ textAlign: 'center', padding: '2rem 0' }}
        >
            {/* Animated check */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: T.successBg, display: 'inline-flex',
                    alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.5rem',
                    border: `2px solid ${T.success}`,
                }}
            >
                <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                >
                    <CheckCircle size={36} color={T.success} strokeWidth={1.5} />
                </motion.div>
            </motion.div>

            <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                    fontSize: '1.5rem', fontFamily: T.fontDisplay, marginBottom: '0.5rem',
                    color: T.textPrimary, fontWeight: 500,
                }}
            >
                Payment Confirmed
            </motion.h3>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ color: T.textSecondary, fontSize: '0.9rem', marginBottom: '2rem' }}
            >
                Your journey has been authorized.
            </motion.p>

            {/* Receipt */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                    background: 'rgba(255, 255, 248, 0.6)',
                    border: `1px solid ${T.border}`,
                    borderRadius: T.radiusSm,
                    padding: '1.25rem',
                    textAlign: 'left',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', color: T.textTertiary, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Amount Charged</span>
                    <span style={{ fontSize: '0.9rem', color: T.textPrimary, fontWeight: 600 }}>₹{amount.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', color: T.textTertiary, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Card</span>
                    <span style={{ fontSize: '0.9rem', color: T.textPrimary, fontFamily: 'monospace' }}>•••• {lastFour || '••••'}</span>
                </div>
                <div style={{ height: '1px', background: T.border, margin: '0.5rem 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.75rem', color: T.textTertiary, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Transaction</span>
                    <span style={{ fontSize: '0.75rem', color: T.accent, fontFamily: 'monospace', fontWeight: 600 }}>{txnId}</span>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ==============================
//  MAIN COMPONENT
// ==============================
const PaymentModal = ({ isOpen, onClose, amount, onSuccess }: PaymentModalProps) => {
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [showCvc, setShowCvc] = useState(false);
    const [errorShake, setErrorShake] = useState(false);

    // Validation
    const nameValid = name.trim().length > 1;
    const cardValid = cardNumber.replace(/\s/g, '').length === 16;
    const expiryValid = expiry.length === 5;
    const cvcValid = cvc.length === 3;
    const isFormValid = nameValid && cardValid && expiryValid && cvcValid;

    const lastFour = cardNumber.replace(/\s/g, '').slice(-4);

    // Reset on close
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setProcessing(false);
                setSuccess(false);
                setError(null);
                setName('');
                setCardNumber('');
                setExpiry('');
                setCvc('');
                setShowCvc(false);
            }, 300);
        }
    }, [isOpen]);

    const handlePayClick = useCallback(() => {
        setError(null);
        if (!isFormValid) {
            setErrorShake(true);
            setTimeout(() => setErrorShake(false), 500);
            return;
        }
        handlePay();
    }, [isFormValid, name, cardNumber, expiry, cvc, amount]);

    const handlePay = async () => {
        setProcessing(true);
        setError(null);
        try {
            const res = await createPaymentIntent({
                amount,
                tripId: 0,
            });

            if (res.data) {
                setTimeout(() => {
                    setProcessing(false);
                    setSuccess(true);
                    setTimeout(() => {
                        onSuccess();
                        setSuccess(false);
                    }, 2500);
                }, 2400);
            }
        } catch (err) {
            console.error('Payment failed', err);
            setProcessing(false);
            setError('Payment could not be processed. Please check your card details and try again.');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'fixed', inset: 0,
                        backgroundColor: 'rgba(28, 25, 23, 0.5)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 2000, padding: '1rem',
                    }}
                    onClick={(e) => { if (e.target === e.currentTarget && !processing) onClose(); }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 30 }}
                        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                        style={{
                            width: '100%',
                            maxWidth: '460px',
                            maxHeight: '95vh',
                            overflowY: 'auto',
                            borderRadius: T.radiusLg,
                            background: T.bg,
                            border: `1px solid rgba(255, 255, 255, 0.35)`,
                            boxShadow: T.shadowDeep,
                        }}
                    >
                        {/* ── Header ── */}
                        <div style={{
                            padding: '1.25rem 1.75rem',
                            borderBottom: `1px solid ${T.border}`,
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '10px',
                                    background: T.accentLight,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Lock size={15} color={T.accent} />
                                </div>
                                <div>
                                    <h2 style={{
                                        margin: 0, fontSize: '1.05rem', fontFamily: T.fontDisplay,
                                        color: T.textPrimary, fontWeight: 600, letterSpacing: '-0.01em',
                                    }}>
                                        Secure Checkout
                                    </h2>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                disabled={processing}
                                style={{
                                    background: 'rgba(28, 25, 23, 0.04)', border: 'none', cursor: 'pointer',
                                    color: T.textSecondary, padding: '6px', borderRadius: '8px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}
                            >
                                <X size={18} />
                            </motion.button>
                        </div>

                        {/* ── Body ── */}
                        <div style={{ padding: '1.75rem' }}>
                            <AnimatePresence mode="wait">
                                {success ? (
                                    <SuccessView key="success" amount={amount} lastFour={lastFour} />
                                ) : processing ? (
                                    <ProcessingAnimation key="processing" />
                                ) : (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Amount Display */}
                                        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                                            <p style={{
                                                color: T.textTertiary, fontSize: '0.7rem', textTransform: 'uppercase',
                                                letterSpacing: '0.12em', marginBottom: '0.35rem', fontWeight: 600,
                                            }}>
                                                Total Amount
                                            </p>
                                            <h3 style={{
                                                fontSize: '2.5rem', margin: 0, color: T.textPrimary,
                                                fontFamily: T.fontDisplay, fontWeight: 500,
                                                letterSpacing: '-0.02em',
                                            }}>
                                                ₹{amount.toLocaleString()}
                                            </h3>
                                        </div>

                                        {/* Visual Card */}
                                        <motion.div
                                            style={{ marginBottom: '1.75rem' }}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <VisualCard
                                                name={name}
                                                number={cardNumber}
                                                expiry={expiry}
                                                cvc={cvc}
                                                showCvc={showCvc}
                                            />
                                        </motion.div>

                                        {/* Error Banner */}
                                        <AnimatePresence>
                                            {error && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                                    animate={{ opacity: 1, height: 'auto', marginBottom: '1rem' }}
                                                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                                    style={{
                                                        background: T.errorBg,
                                                        border: `1px solid rgba(197, 48, 48, 0.15)`,
                                                        borderRadius: T.radiusSm,
                                                        padding: '0.85rem 1rem',
                                                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    <Shield size={16} color={T.error} />
                                                    <span style={{ fontSize: '0.8rem', color: T.error, fontWeight: 500 }}>
                                                        {error}
                                                    </span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Form Fields */}
                                        <motion.form
                                            animate={errorShake ? { x: [-8, 8, -8, 8, 0] } : {}}
                                            transition={{ duration: 0.35 }}
                                            style={{ display: 'grid', gap: '0.85rem' }}
                                            onSubmit={(e) => e.preventDefault()}
                                        >
                                            <FloatingInput
                                                label="Cardholder Name"
                                                value={name}
                                                onChange={setName}
                                                disabled={processing}
                                                valid={nameValid}
                                            />
                                            <FloatingInput
                                                label="Card Number"
                                                value={cardNumber}
                                                onChange={(v) => setCardNumber(fmtCard(v))}
                                                disabled={processing}
                                                icon={<CreditCard size={16} />}
                                                maxLength={19}
                                                valid={cardValid}
                                                monospace
                                            />
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                                                <FloatingInput
                                                    label="MM/YY"
                                                    value={expiry}
                                                    onChange={(v) => setExpiry(fmtExpiry(v))}
                                                    disabled={processing}
                                                    maxLength={5}
                                                    valid={expiryValid}
                                                    monospace
                                                />
                                                <div style={{ position: 'relative' }}>
                                                    <FloatingInput
                                                        label="CVC"
                                                        value={cvc}
                                                        onChange={(v) => setCvc(v.replace(/\D/g, '').substring(0, 3))}
                                                        disabled={processing}
                                                        maxLength={3}
                                                        valid={cvcValid}
                                                        monospace
                                                        type={showCvc ? 'text' : 'password'}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowCvc(!showCvc)}
                                                        onMouseEnter={() => setShowCvc(true)}
                                                        onMouseLeave={() => setShowCvc(false)}
                                                        style={{
                                                            position: 'absolute', right: '2.5rem', top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            background: 'none', border: 'none', cursor: 'pointer',
                                                            color: T.textTertiary, padding: '4px', display: 'flex',
                                                            zIndex: 5,
                                                        }}
                                                    >
                                                        {showCvc ? <EyeOff size={14} /> : <Eye size={14} />}
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.form>

                                        {/* Actions */}
                                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            <motion.button
                                                whileHover={{ scale: 1.015, boxShadow: '0 12px 40px -10px rgba(28, 25, 23, 0.25)' }}
                                                whileTap={{ scale: 0.985 }}
                                                onClick={handlePayClick}
                                                disabled={processing}
                                                style={{
                                                    width: '100%',
                                                    padding: '1.1rem',
                                                    background: isFormValid
                                                        ? T.void
                                                        : 'rgba(28, 25, 23, 0.15)',
                                                    color: isFormValid ? T.ivory : T.textTertiary,
                                                    border: 'none',
                                                    borderRadius: '14px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 700,
                                                    fontFamily: T.fontSans,
                                                    letterSpacing: '0.06em',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    gap: '0.75rem',
                                                    cursor: isFormValid ? 'pointer' : 'default',
                                                    transition: 'background 0.4s, color 0.4s',
                                                }}
                                            >
                                                Pay ₹{amount.toLocaleString()} <Lock size={14} />
                                            </motion.button>
                                            <button
                                                onClick={onClose}
                                                style={{
                                                    width: '100%',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: T.textTertiary,
                                                    fontSize: '0.8rem',
                                                    cursor: 'pointer',
                                                    padding: '0.5rem',
                                                    fontFamily: T.fontSans,
                                                    fontWeight: 500,
                                                    transition: 'color 0.2s',
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.color = T.textSecondary}
                                                onMouseLeave={(e) => e.currentTarget.style.color = T.textTertiary}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* ── Footer ── */}
                        <div style={{
                            background: 'rgba(255, 255, 248, 0.5)',
                            padding: '0.85rem 1.75rem',
                            borderTop: `1px solid ${T.border}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            fontSize: '0.7rem', color: T.textTertiary, fontWeight: 500,
                        }}>
                            <Lock size={11} />
                            <span>256-bit SSL Encrypted</span>
                            <span style={{ opacity: 0.3 }}>•</span>
                            <span>Secure Test Environment</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;
