import React from 'react';
import logger from '../../utils/logger';
import { AlertTriangle, RotateCcw, Activity } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        logger.emergency("Rescue App Crash", error, {
            componentStack: errorInfo.componentStack
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6 border border-red-500/50">
                        <AlertTriangle className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Rescue System Error</h1>
                    <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-mono mb-6">
                        CRITICAL_SYSTEM_FAULT
                    </div>

                    <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
                        The application encountered an unexpected error. Emergency systems are still active in the background, but the UI needs to be restored.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/20"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Restart Application
                        </button>

                        <a
                            href="tel:911"
                            className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all"
                        >
                            <Activity className="w-5 h-5 text-red-500" />
                            Call Emergency (911)
                        </a>
                    </div>

                    <div className="mt-12 p-4 bg-slate-900/50 border border-white/5 rounded-lg max-w-lg">
                        <p className="text-xs text-slate-500 text-left overflow-auto max-h-32 font-mono">
                            {this.state.error && this.state.error.toString()}
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
