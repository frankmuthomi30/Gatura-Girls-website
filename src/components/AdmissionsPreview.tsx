import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  GraduationCap, 
  CheckCircle2, 
  FileText, 
  Smartphone, 
  QrCode, 
  CreditCard,
  Building,
  Sparkles
} from 'lucide-react';

interface AdmissionsPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdmissionsPreview: React.FC<AdmissionsPreviewProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [applicant, setApplicant] = useState({
    studentName: '',
    guardianName: '',
    phone: '',
    email: '',
    system: 'CBC Grade 10',
    pathway: 'STEM (Sciences & Engineering)',
    previousSchool: '',
    kcpeKpseaScore: ''
  });
  const [referenceCode, setReferenceCode] = useState<string | null>(null);
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [mpesaPaid, setMpesaPaid] = useState(false);
  const [processingStk, setProcessingStk] = useState(false);

  if (!isOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `STG-2027-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceCode(ref);
    setStep(2);
  };

  const handleMpesaStkPush = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessingStk(true);
    setTimeout(() => {
      setProcessingStk(false);
      setMpesaPaid(true);
      setStep(3);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-500">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Online Admissions Portal 2027</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">St. Teresa Gatura Girls Senior School</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
          <div className={`p-2 rounded-xl border ${step >= 1 ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
            1. Application
          </div>
          <div className={`p-2 rounded-xl border ${step >= 2 ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
            2. M-Pesa Fee
          </div>
          <div className={`p-2 rounded-xl border ${step === 3 ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
            3. Admission Letter
          </div>
        </div>

        {/* STEP 1: APPLICATION FORM */}
        {step === 1 && (
          <form onSubmit={handleApply} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Student Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mary Muthoni Karanja"
                  value={applicant.studentName}
                  onChange={(e) => setApplicant({ ...applicant, studentName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Parent / Guardian Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Karanja"
                  value={applicant.guardianName}
                  onChange={(e) => setApplicant({ ...applicant, guardianName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+254 700 000 000"
                  value={applicant.phone}
                  onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="guardian@example.com"
                  value={applicant.email}
                  onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Academic System</label>
                <select
                  value={applicant.system}
                  onChange={(e) => setApplicant({ ...applicant, system: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs"
                >
                  <option value="CBC Grade 10">CBC Senior Secondary (Grade 10)</option>
                  <option value="8-4-4 Form 1">8-4-4 System (Form 1)</option>
                  <option value="Transfer Student">Transfer Student (Form 2/3 / Grade 11)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Senior Pathway Choice</label>
                <select
                  value={applicant.pathway}
                  onChange={(e) => setApplicant({ ...applicant, pathway: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs"
                >
                  <option value="STEM (Sciences & Engineering)">STEM (Pure Sciences, IT, Agriculture)</option>
                  <option value="Social Sciences (Languages & Business)">Social Sciences (Humanities & Business)</option>
                  <option value="Arts & Sports Science">Arts & Sports Science</option>
                  <option value="Standard 8-4-4 Secondary">Standard 8-4-4 Science/Arts</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Primary / Junior Secondary School</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gatura Primary School"
                  value={applicant.previousSchool}
                  onChange={(e) => setApplicant({ ...applicant, previousSchool: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">KCPE / KPSEA Score</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 365 Marks / Exceeding Expectations"
                  value={applicant.kcpeKpseaScore}
                  onChange={(e) => setApplicant({ ...applicant, kcpeKpseaScore: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20"
            >
              Proceed to Reference & Payment Verification
            </button>
          </form>
        )}

        {/* STEP 2: M-PESA PAYMENT SIMULATION */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Application Reference Generated
              </span>
              <p className="text-2xl font-black font-mono text-slate-900 dark:text-white">{referenceCode}</p>
              <p className="text-xs text-slate-500">Applicant: <strong>{applicant.studentName}</strong> ({applicant.system})</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
              <div className="flex items-center space-x-3 text-emerald-400 font-bold text-sm">
                <Smartphone className="w-5 h-5 text-emerald-500" />
                <span>M-Pesa STK Push Fee Payment</span>
              </div>
              <p className="text-xs text-slate-300">
                Standard Application Processing Fee: <strong>KES 1,500</strong>. Enter your Safaricom phone number to trigger an automated M-Pesa STK Push prompt on your handset.
              </p>

              <form onSubmit={handleMpesaStkPush} className="space-y-3">
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0722 000 000"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500"
                />

                <button
                  type="submit"
                  disabled={processingStk}
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 shadow-lg"
                >
                  {processingStk ? (
                    <span>Sending M-Pesa STK Push Prompt...</span>
                  ) : (
                    <span>Pay KES 1,500 via M-Pesa STK Push</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* STEP 3: ADMISSION CONFIRMATION LETTER */}
        {step === 3 && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase">
                Status: Provisionally Admitted
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Admission Reference: {referenceCode}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Congratulations! <strong>{applicant.studentName}</strong> has been provisionally accepted into St. Teresa Gatura Girls Senior School ({applicant.system} — {applicant.pathway}).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <p><strong>Guardian:</strong> {applicant.guardianName} ({applicant.phone})</p>
              <p><strong>Primary School:</strong> {applicant.previousSchool}</p>
              <p><strong>Report Date:</strong> First Week of Term 1, 2027 (8:00 AM)</p>
              <p><strong>M-Pesa Verification Tx:</strong> MPESA-STG-{Math.floor(Math.random()*1000000)} (CONFIRMED)</p>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => {
                  alert(`Downloading Admission Letter PDF for ${applicant.studentName} (Ref: ${referenceCode})`);
                  onClose();
                }}
                className="flex-1 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
              >
                Download Official Admission Letter (PDF)
              </button>
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                Close Portal
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
