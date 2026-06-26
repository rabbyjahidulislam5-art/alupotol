'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import DashboardLayout from '@/components/DashboardLayout';
import { useToast } from '@/components/hooks';
import api from '@/lib/api';
import studentNav from '../nav';

export default function TopUpPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { show, ToastComponent } = useToast();
  const [amount, setAmount] = useState('');
  const [gateway, setGateway] = useState('bkash');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'confirm'>('form');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [devOtp, setDevOtp] = useState<string | null>(null);

  const presets = [100, 200, 500, 1000, 2000, 5000];

  const requestOtp = async () => {
    setOtpLoading(true);
    setDevOtp(null);
    try {
      const res = await api.post('/wallet/request-otp', { purpose: 'TOPUP' });
      setOtpSent(true);
      if (res.data.data?.devOtp) {
        setDevOtp(res.data.data.devOtp);
      }
      show('OTP sent successfully', 'success');
    } catch (err: any) {
      show(err.response?.data?.error?.message || 'Failed to send OTP', 'error');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async () => {
    const paisa = parseInt(amount) * 100;
    if (paisa < 5000) return show('Minimum ৳50', 'error');
    setLoading(true);
    try {
      const res = await api.post('/wallet/topup/initiate', { amount: paisa, gateway, otp });
      const { gatewayRedirect, intentId } = res.data.data;
      // In production: redirect to gateway
      show(`Payment initiated! Redirecting to ${gateway}...`, 'success');
      setTimeout(() => {
        // Simulate success for demo
        api.post(`/payments/webhook/${gateway}`, { tran_id: intentId, status: 'VALID', val_id: 'demo', amount }).catch(() => {});
        router.push('/student/wallet');
      }, 2000);
    } catch (err: any) { show(err.response?.data?.error?.message || 'Top-up failed', 'error'); }
    finally { setLoading(false); }
  };

  return (
    <DashboardLayout navItems={studentNav} activePath="/student/wallet/topup" userName={user?.fullName || ''} role="Student" onLogout={logout}>
      <ToastComponent />
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Top Up Wallet</h1>

      <div className="max-w-lg">
        {step === 'form' && (
          <>
            <div className="card mb-6">
              <label className="text-sm font-medium text-gray-700 block mb-2">Amount (BDT)</label>
              <div className="relative mb-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">৳</span>
                <input className="input text-2xl font-bold pl-8 text-right" type="number" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} min="50" max="10000" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {presets.map(p => (
                  <button key={p} onClick={() => setAmount(String(p))} className={`py-2 rounded-lg text-sm font-semibold border transition-all ${amount === String(p) ? 'border-indigo-600 bg-indigo-50 text-indigo-600 font-bold' : 'border-gray-200 hover:border-indigo-300 hover:text-indigo-600'}`}>
                    ৳{p}
                  </button>
                ))}
              </div>
            </div>

            <div className="card mb-6">
              <label className="text-sm font-medium text-gray-700 block mb-3">Payment Method</label>
              <div className="space-y-3">
                {[
                  { key: 'bkash', label: 'bKash', icon: '📱', color: 'bg-pink-50/50 border-pink-100 hover:bg-pink-50' },
                  { key: 'nagad', label: 'Nagad', icon: '📱', color: 'bg-orange-50/50 border-orange-100 hover:bg-orange-50' },
                  { key: 'sslcommerz', label: 'Card Payment', icon: '💳', color: 'bg-indigo-50/30 border-indigo-100 hover:bg-indigo-50/60' },
                ].map(g => (
                  <label key={g.key} className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${gateway === g.key ? 'border-indigo-600 bg-indigo-50' : g.color}`}>
                    <input type="radio" name="gateway" value={g.key} checked={gateway === g.key} onChange={e => setGateway(e.target.value)} className="accent-indigo-600" />
                    <span className="text-xl">{g.icon}</span>
                    <span className="text-sm font-semibold">{g.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="btn btn-primary w-full btn-lg" onClick={() => setStep('confirm')} disabled={loading || !amount || parseInt(amount) < 50}>
              Continue
            </button>
          </>
        )}

        {step === 'confirm' && (
          <div className="card text-center space-y-4">
            <span className="text-4xl block mb-2">💳</span>
            <h2 className="text-lg font-semibold">Confirm Top Up</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left space-y-2">
              <p className="text-sm text-gray-500">Amount: <strong className="text-gray-900 text-lg">৳{parseInt(amount).toLocaleString()}</strong></p>
              <p className="text-sm text-gray-500">Gateway: <strong className="text-gray-900 capitalize">{gateway}</strong></p>
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3 text-left">
              <label className="text-sm font-medium text-gray-700 block">OTP Verification</label>
              <div className="flex gap-2">
                <input
                  className="input text-center text-xl font-bold tracking-[0.2em] flex-1"
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  disabled={!otpSent}
                />
                <button
                  className="btn btn-secondary text-sm whitespace-nowrap"
                  onClick={requestOtp}
                  disabled={otpLoading}
                >
                  {otpLoading ? 'Sending...' : otpSent ? 'Resend OTP' : 'Send OTP'}
                </button>
              </div>
              {devOtp && (
                <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs p-2 rounded-lg text-center font-semibold">
                  💡 [Dev Mode] Simulated OTP: {devOtp}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button className="btn btn-secondary flex-1" onClick={() => { setStep('form'); setOtp(''); setOtpSent(false); setDevOtp(null); }}>Cancel</button>
              <button className="btn btn-primary flex-1" onClick={handleSubmit} disabled={loading || !otpSent || otp.length !== 6}>
                {loading ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
