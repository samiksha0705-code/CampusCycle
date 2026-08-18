import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CampusLogo } from './CampusLogo';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User as UserIcon, 
  Building2, 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  FileText, 
  Leaf, 
  KeyRound, 
  HelpCircle,
  Hash,
  Home,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthViewProps {
  initialMode?: 'signin' | 'signup';
}

export const AuthView: React.FC<AuthViewProps> = ({ initialMode = 'signin' }) => {
  const { 
    signUpUser, 
    loginUser, 
    loginAs, 
    requestPasswordReset, 
    setActiveTab,
    showToast 
  } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Sign In Form State
  const [loginIdentifier, setLoginIdentifier] = useState('alex.rivera@niet.edu.in');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sign Up Form State
  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [campus, setCampus] = useState('NIET Campus');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [year, setYear] = useState('1st Year');
  const [rollNumber, setRollNumber] = useState('');
  const [hostel, setHostel] = useState('Aryabhatta Hostel (Block A)');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
  const [idVerified, setIdVerified] = useState(false);
  const [agreedToPledge, setAgreedToPledge] = useState(true);
  const [signupError, setSignupError] = useState<string | null>(null);

  // Password strength calculations
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@$!%*?&#]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const strengthScore = [hasMinLength, hasNumber, hasSpecial, hasUpper].filter(Boolean).length;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginIdentifier.trim()) {
      setLoginError('Please enter your campus email or student roll number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = loginUser(loginIdentifier, loginPassword);
      setIsSubmitting(false);
      if (!res.success) {
        setLoginError(res.message);
      }
    }, 400);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);

    if (!name.trim()) {
      setSignupError('Please enter your full student name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setSignupError('Please provide a valid campus institutional email.');
      return;
    }
    if (!rollNumber.trim()) {
      setSignupError('Please provide your university roll number or student ID.');
      return;
    }

    setSignupStep(2);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);

    if (password.length < 6) {
      setSignupError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setSignupError('Passwords do not match.');
      return;
    }
    if (!agreedToPledge) {
      setSignupError('Please accept the Campus Eco & Circular Economy pledge.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = signUpUser({
        name,
        email,
        password,
        rollNumber,
        campus,
        department,
        year,
        hostel,
        idCardImage: idCardPreview || undefined,
        role: 'student'
      });
      setIsSubmitting(false);
      if (!res.success) {
        setSignupError(res.message);
      }
    }, 400);
  };

  const handleSampleIdUpload = () => {
    setIdCardPreview('https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80');
    setIdVerified(true);
    showToast('Student ID Verified ✨', 'Institutional badge matched with NIET Student Database.', 'success');
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    const res = requestPasswordReset(forgotEmail);
    if (res.success) {
      setForgotSubmitted(true);
    }
  };

  const applyDomainSuggestion = (domain: string) => {
    const username = email.split('@')[0] || 'student';
    setEmail(`${username}@${domain}`);
  };

  return (
    <div id="campuscycle-auth-page" className="max-w-4xl mx-auto py-4 sm:py-8">
      
      {/* Top Banner Card */}
      <div className="bg-white border border-[#D8F3DC] rounded-3xl p-6 sm:p-8 shadow-sm mb-6 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#D8F3DC]/40 blur-2xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <CampusLogo size="lg" />
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#1B4332] font-['Outfit',sans-serif]">
                  Campus Student Authentication
                </h1>
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-extrabold bg-[#D8F3DC] text-[#1B4332] px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-[#2D6A4F]" /> SSL 256-Bit
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#3F5B50] mt-0.5">
                Connecting 12,000+ verified campus peers for sustainable, zero-waste exchange
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#F1FAF4] p-1 rounded-2xl border border-[#D8F3DC] shrink-0">
            <button
              id="auth-tab-signin"
              onClick={() => {
                setMode('signin');
                setLoginError(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                mode === 'signin' 
                  ? 'bg-[#1B4332] text-white shadow-xs' 
                  : 'text-[#3F5B50] hover:text-[#1B4332]'
              }`}
            >
              Sign In
            </button>
            <button
              id="auth-tab-signup"
              onClick={() => {
                setMode('signup');
                setSignupError(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                mode === 'signup' 
                  ? 'bg-[#1B4332] text-white shadow-xs' 
                  : 'text-[#3F5B50] hover:text-[#1B4332]'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Authentication Form Panel */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-[#D8F3DC] rounded-3xl p-6 sm:p-8 shadow-sm">
            
            {/* SIGN IN VIEW */}
            {mode === 'signin' && (
              <motion.div
                key="signin-view"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-[#1B4332] font-['Outfit',sans-serif]">
                    Welcome back to CampusCycle
                  </h2>
                  <p className="text-xs text-[#6B8577] mt-0.5">
                    Sign in using your verified campus email or university roll number.
                  </p>
                </div>

                {loginError && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleSignIn} className="space-y-4">
                  {/* Campus Email or Roll No */}
                  <div>
                    <label className="block text-xs font-bold text-[#1B4332] mb-1">
                      Campus Webmail or Roll Number
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#6B8577] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="signin-email-input"
                        type="text"
                        value={loginIdentifier}
                        onChange={e => setLoginIdentifier(e.target.value)}
                        placeholder="e.g. alex.rivera@niet.edu.in or 210133010045"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#D8F3DC] text-xs sm:text-sm text-[#1B4332] bg-[#F1FAF4]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] transition-all"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-[#1B4332]">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setForgotEmail(loginIdentifier.includes('@') ? loginIdentifier : '');
                          setIsForgotPasswordOpen(true);
                          setForgotSubmitted(false);
                        }}
                        className="text-[11px] font-semibold text-[#2D6A4F] hover:text-[#1B4332] hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#6B8577] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="signin-password-input"
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        placeholder="Enter your account password"
                        required
                        className="w-full pl-10 pr-10 py-3 rounded-2xl border border-[#D8F3DC] text-xs sm:text-sm text-[#1B4332] bg-[#F1FAF4]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B8577] hover:text-[#1B4332] cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 text-xs text-[#3F5B50] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={e => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-[#D8F3DC] text-[#1B4332] focus:ring-[#2D6A4F] accent-[#1B4332]"
                      />
                      <span>Keep me signed in on this campus device</span>
                    </label>
                  </div>

                  {/* Sign In CTA */}
                  <button
                    id="signin-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#1B4332]/20 active:scale-98 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Verifying Campus Credentials...
                      </span>
                    ) : (
                      <>
                        <span>Sign In to Student Hub</span>
                        <ArrowRight className="w-4 h-4 text-[#B9F98C]" />
                      </>
                    )}
                  </button>
                </form>

                {/* Footer Switch */}
                <div className="pt-4 border-t border-[#D8F3DC] text-center">
                  <p className="text-xs text-[#6B8577]">
                    New to your college campus?{' '}
                    <button
                      onClick={() => {
                        setMode('signup');
                        setSignupError(null);
                      }}
                      className="font-extrabold text-[#1B4332] hover:underline cursor-pointer"
                    >
                      Create a verified student profile
                    </button>
                  </p>
                </div>
              </motion.div>
            )}

            {/* SIGN UP VIEW */}
            {mode === 'signup' && (
              <motion.div
                key="signup-view"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-[#1B4332] font-['Outfit',sans-serif]">
                      Join CampusCycle Network
                    </h2>
                    <p className="text-xs text-[#6B8577] mt-0.5">
                      Earn <strong className="text-[#2D6A4F]">+100 Welcome Eco Points</strong> on registration
                    </p>
                  </div>

                  {/* Step Indicator */}
                  <div className="flex items-center gap-1.5 bg-[#F1FAF4] px-3 py-1.5 rounded-full border border-[#D8F3DC]">
                    <span className={`w-2 h-2 rounded-full ${signupStep === 1 ? 'bg-[#1B4332]' : 'bg-[#40916C]'}`}></span>
                    <span className="text-xs font-bold text-[#1B4332]">Step {signupStep} of 2</span>
                  </div>
                </div>

                {signupError && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <span>{signupError}</span>
                  </div>
                )}

                {/* STEP 1: Academic & Campus Profile */}
                {signupStep === 1 && (
                  <form onSubmit={handleNextStep} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#1B4332] mb-1">
                        Full Student Name *
                      </label>
                      <div className="relative">
                        <UserIcon className="w-4 h-4 text-[#6B8577] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="signup-name-input"
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="e.g. Rohan Sharma"
                          required
                          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#D8F3DC] text-xs sm:text-sm text-[#1B4332] bg-[#F1FAF4]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                        />
                      </div>
                    </div>

                    {/* Official Campus Email */}
                    <div>
                      <label className="block text-xs font-bold text-[#1B4332] mb-1">
                        Official College Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#6B8577] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="signup-email-input"
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="e.g. rohan.sharma@niet.edu.in"
                          required
                          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#D8F3DC] text-xs sm:text-sm text-[#1B4332] bg-[#F1FAF4]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                        />
                      </div>
                      
                      {/* Auto domain suggestion tags */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="text-[10px] text-[#6B8577]">Quick Domain:</span>
                        {['niet.edu.in', 'aktu.ac.in', 'galgotias.edu', 'sharda.ac.in', 'student.edu'].map(dom => (
                          <button
                            key={dom}
                            type="button"
                            onClick={() => applyDomainSuggestion(dom)}
                            className="text-[10px] font-semibold text-[#1B4332] bg-[#D8F3DC] hover:bg-[#95D5B2] px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                          >
                            @{dom}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Campus & Roll Number Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#1B4332] mb-1">
                          College / Campus *
                        </label>
                        <select
                          value={campus}
                          onChange={e => setCampus(e.target.value)}
                          className="w-full p-2.5 rounded-2xl border border-[#D8F3DC] text-xs text-[#1B4332] bg-[#F1FAF4]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                        >
                          <option value="NIET Campus">NIET Greater Noida</option>
                          <option value="AKTU University Hub">AKTU Main Campus</option>
                          <option value="Galgotias Campus">Galgotias University</option>
                          <option value="Sharda University">Sharda University</option>
                          <option value="Bennett University">Bennett University</option>
                          <option value="Delhi Tech Hub">DTU / NSUT Hub</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1B4332] mb-1">
                          Roll / University ID *
                        </label>
                        <div className="relative">
                          <Hash className="w-4 h-4 text-[#6B8577] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={rollNumber}
                            onChange={e => setRollNumber(e.target.value)}
                            placeholder="e.g. 2301330100089"
                            required
                            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#D8F3DC] text-xs text-[#1B4332] bg-[#F1FAF4]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Department & Year */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#1B4332] mb-1">
                          Department / Branch *
                        </label>
                        <select
                          value={department}
                          onChange={e => setDepartment(e.target.value)}
                          className="w-full p-2.5 rounded-2xl border border-[#D8F3DC] text-xs text-[#1B4332] bg-[#F1FAF4]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                        >
                          <option value="Computer Science & Engineering">Computer Science & Engg (CSE)</option>
                          <option value="Information Technology">Information Technology (IT)</option>
                          <option value="Biotechnology">Biotechnology</option>
                          <option value="Electronics & Communication">ECE</option>
                          <option value="Mechanical Engineering">Mechanical Engg</option>
                          <option value="Management Studies (MBA)">Management Studies (MBA)</option>
                          <option value="Pharmacy">Pharmacy</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1B4332] mb-1">
                          Current Year of Study *
                        </label>
                        <select
                          value={year}
                          onChange={e => setYear(e.target.value)}
                          className="w-full p-2.5 rounded-2xl border border-[#D8F3DC] text-xs text-[#1B4332] bg-[#F1FAF4]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                        >
                          <option value="1st Year (Fresher)">1st Year (Fresher)</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year (Final Year)">4th Year (Final Year)</option>
                          <option value="Postgraduate / PhD">Postgraduate / PhD</option>
                        </select>
                      </div>
                    </div>

                    {/* Hostel / Residence */}
                    <div>
                      <label className="block text-xs font-bold text-[#1B4332] mb-1">
                        Campus Hostel / Residence
                      </label>
                      <div className="relative">
                        <Home className="w-4 h-4 text-[#6B8577] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={hostel}
                          onChange={e => setHostel(e.target.value)}
                          placeholder="e.g. Aryabhatta Hostel Block B or Day Scholar"
                          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#D8F3DC] text-xs text-[#1B4332] bg-[#F1FAF4]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                        />
                      </div>
                    </div>

                    <button
                      id="signup-next-btn"
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-2xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#1B4332]/20 active:scale-98 transition-all cursor-pointer"
                    >
                      <span>Continue to Security & ID Verification</span>
                      <ArrowRight className="w-4 h-4 text-[#B9F98C]" />
                    </button>
                  </form>
                )}

                {/* STEP 2: Password, ID Card & Eco Pledge */}
                {signupStep === 2 && (
                  <form onSubmit={handleSignUp} className="space-y-4">
                    {/* Password */}
                    <div>
                      <label className="block text-xs font-bold text-[#1B4332] mb-1">
                        Create Password *
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#6B8577] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="signup-password-input"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="At least 8 characters with numbers & symbols"
                          required
                          className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-[#D8F3DC] text-xs text-[#1B4332] bg-[#F1FAF4]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B8577] hover:text-[#1B4332] cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Password Strength Meter */}
                      {password.length > 0 && (
                        <div className="mt-2 space-y-1.5">
                          <div className="flex gap-1 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full flex-1 transition-all ${strengthScore >= 1 ? 'bg-amber-500' : 'bg-slate-200'}`}></div>
                            <div className={`h-full flex-1 transition-all ${strengthScore >= 2 ? 'bg-amber-500' : 'bg-slate-200'}`}></div>
                            <div className={`h-full flex-1 transition-all ${strengthScore >= 3 ? 'bg-[#40916C]' : 'bg-slate-200'}`}></div>
                            <div className={`h-full flex-1 transition-all ${strengthScore >= 4 ? 'bg-[#1B4332]' : 'bg-slate-200'}`}></div>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-[#6B8577]">
                            <span>Strength: {strengthScore <= 1 ? 'Weak' : strengthScore <= 3 ? 'Good' : 'Strong & Secure'}</span>
                            <span>8+ chars • Uppercase • Number • Symbol</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-xs font-bold text-[#1B4332] mb-1">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#6B8577] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="signup-confirmpassword-input"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          placeholder="Re-type your password"
                          required
                          className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-[#D8F3DC] text-xs text-[#1B4332] bg-[#F1FAF4]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B8577] hover:text-[#1B4332] cursor-pointer"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Student ID Card Verification Simulator */}
                    <div className="p-3.5 rounded-2xl bg-[#F1FAF4] border border-[#D8F3DC] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1B4332] flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                          Student ID Verification Badge
                        </span>
                        {idVerified && (
                          <span className="text-[10px] font-extrabold bg-[#D8F3DC] text-[#1B4332] px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3 text-[#2D6A4F]" /> Verified
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-[#6B8577]">
                        Upload your college ID card or click below to simulate instant student OCR validation.
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={handleSampleIdUpload}
                          className="flex-1 py-2 px-3 rounded-xl bg-white border border-[#D8F3DC] hover:border-[#2D6A4F] text-xs font-bold text-[#1B4332] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5 text-[#2D6A4F]" />
                          <span>Use Sample Verified ID</span>
                        </button>
                      </div>
                    </div>

                    {/* Campus Eco Pledge */}
                    <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#D8F3DC]/40 border border-[#D8F3DC] text-xs text-[#1B4332] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedToPledge}
                        onChange={e => setAgreedToPledge(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-[#D8F3DC] text-[#1B4332] accent-[#1B4332]"
                      />
                      <span className="leading-snug">
                        <strong>Campus Eco Pledge:</strong> I commit to keeping our campus circular, trading honestly with fellow students, and preventing landfill waste.
                      </span>
                    </label>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setSignupStep(1)}
                        className="py-3 px-4 bg-[#F1FAF4] text-[#1B4332] hover:bg-[#D8F3DC] rounded-2xl text-xs font-bold transition-all cursor-pointer"
                      >
                        Back
                      </button>

                      <button
                        id="signup-submit-btn"
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3.5 px-4 rounded-2xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#1B4332]/20 active:scale-98 transition-all cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Creating Verified Profile...
                          </span>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-[#B9F98C]" />
                            <span>Activate Account (+100 Eco Points)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                <div className="pt-3 border-t border-[#D8F3DC] text-center">
                  <p className="text-xs text-[#6B8577]">
                    Already have a student account?{' '}
                    <button
                      onClick={() => {
                        setMode('signin');
                        setSignupError(null);
                      }}
                      className="font-extrabold text-[#1B4332] hover:underline cursor-pointer"
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
              </motion.div>
            )}

          </div>
        </div>

        {/* Right Sidebar: Quick Demo Logins & Campus Security Benefits */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Quick 1-Click Demo Logins for Judges/Evaluators */}
          <div className="bg-white border border-[#D8F3DC] rounded-3xl p-5 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#D8F3DC]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2D6A4F]" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1B4332]">
                  Quick 1-Click Demo Profiles
                </h3>
              </div>
              <span className="text-[10px] font-bold text-[#40916C] bg-[#D8F3DC] px-2 py-0.5 rounded-full">
                For Evaluation
              </span>
            </div>

            <p className="text-[11px] text-[#6B8577]">
              Instantly test different role capabilities with populated transactions and badges:
            </p>

            <div className="space-y-2">
              {/* Alex Rivera (Verified Student Champion) */}
              <button
                onClick={() => loginAs('student')}
                className="w-full p-2.5 rounded-2xl border border-[#D8F3DC] hover:border-[#2D6A4F] bg-[#F1FAF4]/50 hover:bg-[#D8F3DC]/40 transition-all flex items-center justify-between group cursor-pointer text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                    className="w-9 h-9 rounded-xl object-cover ring-1 ring-[#2D6A4F]"
                    alt=""
                  />
                  <div className="truncate">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-extrabold text-[#1B4332]">Alex Rivera</span>
                      <ShieldCheck className="w-3 h-3 text-[#2D6A4F]" />
                    </div>
                    <p className="text-[10px] text-[#6B8577]">CSE 3rd Year • Score 82/100</p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold text-[#1B4332] bg-white px-2 py-1 rounded-lg border border-[#D8F3DC] group-hover:bg-[#1B4332] group-hover:text-white transition-colors">
                  Login Student
                </span>
              </button>

              {/* Priya Sharma (Biotech Student Eco Leader) */}
              <button
                onClick={() => loginAs('priya')}
                className="w-full p-2.5 rounded-2xl border border-[#D8F3DC] hover:border-[#2D6A4F] bg-[#F1FAF4]/50 hover:bg-[#D8F3DC]/40 transition-all flex items-center justify-between group cursor-pointer text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80"
                    className="w-9 h-9 rounded-xl object-cover ring-1 ring-[#2D6A4F]"
                    alt=""
                  />
                  <div className="truncate">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-extrabold text-[#1B4332]">Priya Sharma</span>
                      <ShieldCheck className="w-3 h-3 text-[#2D6A4F]" />
                    </div>
                    <p className="text-[10px] text-[#6B8577]">Biotech 3rd Year • Score 92/100</p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold text-[#1B4332] bg-white px-2 py-1 rounded-lg border border-[#D8F3DC] group-hover:bg-[#1B4332] group-hover:text-white transition-colors">
                  Login Peer
                </span>
              </button>

              {/* Dr. Ramesh Sharma (Campus Admin) */}
              <button
                onClick={() => loginAs('admin')}
                className="w-full p-2.5 rounded-2xl border border-[#D8F3DC] hover:border-[#2D6A4F] bg-[#F1FAF4]/50 hover:bg-[#D8F3DC]/40 transition-all flex items-center justify-between group cursor-pointer text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80"
                    className="w-9 h-9 rounded-xl object-cover ring-1 ring-[#2D6A4F]"
                    alt=""
                  />
                  <div className="truncate">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-extrabold text-[#1B4332]">Dr. Ramesh Verma</span>
                      <Building2 className="w-3 h-3 text-[#2D6A4F]" />
                    </div>
                    <p className="text-[10px] text-[#6B8577]">Dean Eco Council • Admin Panel</p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold text-[#1B4332] bg-white px-2 py-1 rounded-lg border border-[#D8F3DC] group-hover:bg-[#1B4332] group-hover:text-white transition-colors">
                  Login Admin
                </span>
              </button>
            </div>
          </div>

          {/* Campus Security & Institutional Trust Card */}
          <div className="bg-gradient-to-br from-[#F1FAF4] to-[#D8F3DC]/40 border border-[#D8F3DC] rounded-3xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-[#1B4332]">
              <Leaf className="w-4 h-4 text-[#2D6A4F]" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Why Verified Campus Auth?</h4>
            </div>

            <ul className="space-y-2 text-xs text-[#3F5B50]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0 mt-0.5" />
                <span><strong>No Outsiders / Scams:</strong> Restricted to verified college students and faculty.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0 mt-0.5" />
                <span><strong>Safe Campus Meetups:</strong> Designated safe handovers at Central Library & Food Courts.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0 mt-0.5" />
                <span><strong>Institutional Eco Credits:</strong> All reuse & donations count towards your semester score.</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-[#D8F3DC]/80 flex items-center justify-between">
              <button
                onClick={() => loginAs('guest')}
                className="text-xs font-bold text-[#2D6A4F] hover:text-[#1B4332] hover:underline cursor-pointer"
              >
                Browse Marketplace as Guest Visitor →
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* FORGOT PASSWORD MODAL */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 z-60 bg-[#1B4332]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-[#D8F3DC] space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#D8F3DC]">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-[#2D6A4F]" />
                <h3 className="text-base font-extrabold text-[#1B4332] font-['Outfit',sans-serif]">
                  Campus Password Recovery
                </h3>
              </div>
              <button
                onClick={() => setIsForgotPasswordOpen(false)}
                className="text-[#6B8577] hover:text-[#1B4332] p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {!forgotSubmitted ? (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-3.5">
                <p className="text-xs text-[#3F5B50] leading-relaxed">
                  Enter your registered college email. We'll send an authentication reset link to your campus inbox.
                </p>

                <div>
                  <label className="block text-xs font-bold text-[#1B4332] mb-1">
                    Campus Webmail Address
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    placeholder="e.g. yourname@niet.edu.in"
                    required
                    className="w-full p-2.5 rounded-2xl border border-[#D8F3DC] text-xs text-[#1B4332] bg-[#F1FAF4]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordOpen(false)}
                    className="flex-1 py-2.5 bg-[#F1FAF4] text-[#1B4332] rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-3 text-center py-3">
                <div className="w-12 h-12 rounded-full bg-[#D8F3DC] text-[#1B4332] flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6 text-[#2D6A4F]" />
                </div>
                <h4 className="text-sm font-extrabold text-[#1B4332]">Instructions Sent!</h4>
                <p className="text-xs text-[#3F5B50]">
                  We dispatched password recovery instructions to <strong>{forgotEmail}</strong>. Please check your spam or institutional inbox.
                </p>
                <button
                  onClick={() => setIsForgotPasswordOpen(false)}
                  className="w-full py-2.5 bg-[#1B4332] text-white rounded-xl text-xs font-bold mt-2 cursor-pointer"
                >
                  Done & Back to Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
