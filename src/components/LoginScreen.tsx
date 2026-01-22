'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function LoginScreen() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const { login } = useAuth();
  const { t, language, toggleLanguage } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] px-6">
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="absolute top-6 right-6 text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors duration-200"
      >
        {language === 'ko' ? 'EN' : 'KO'}
      </button>

      <div className={`w-full max-w-sm ${isShaking ? 'animate-shake' : ''}`}>
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-3">
            Biospectrum
          </h1>
          <p className="text-zinc-500 text-sm">
            {t('프로젝트 대시보드', 'Project Dashboard')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              {t('비밀번호', 'Password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="••••"
              className={`w-full px-4 py-3 bg-white border rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all duration-200 ${
                error ? 'border-red-400 ring-2 ring-red-100' : 'border-zinc-200'
              }`}
              autoFocus
            />
            {error && (
              <p className="mt-3 text-sm text-red-500">
                {t('비밀번호가 올바르지 않습니다', 'Incorrect password')}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-all duration-200"
          >
            {t('접속하기', 'Enter')}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-12 text-center text-xs text-zinc-400">
          Shopify Renewal Project
        </p>
      </div>
    </div>
  );
}
