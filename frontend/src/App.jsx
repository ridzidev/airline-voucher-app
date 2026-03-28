import { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    flightNumber: '',
    date: '',
    aircraft: 'ATR',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successData, setSuccessData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessData(null);

    try {
      const checkRes = await axios.post('http://127.0.0.1:8000/api/check', {
        flightNumber: formData.flightNumber,
        date: formData.date,
      });

      if (checkRes.data.exists) {
        setErrorMsg('Vouchers have already been generated for this flight.');
        setLoading(false);
        return;
      }

      const generateRes = await axios.post('http://127.0.0.1:8000/api/generate', formData);

      if (generateRes.data.success) {
        setSuccessData(generateRes.data.seats);
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || 'Connection error. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    // Background bernuansa biru langit gelap ke navy untuk kesan penerbangan malam/premium
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4 sm:p-8 transition-colors duration-500 font-sans relative overflow-hidden">
      
      {/* Dekorasi Latar Belakang (Opsional: memberi kesan awan/langit abstrak) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-400/10 dark:bg-sky-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-lg w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20 dark:border-slate-700/50 p-8 sm:p-10 relative z-10">
        
        {/* Header Section */}
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-50 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 shadow-inner">
            {/* Ikon Pesawat (SVG) */}
            <svg className="w-8 h-8 text-blue-600 dark:text-sky-400 transform rotate-45" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Flight Voucher
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium">
            Generate seats for your upcoming departure.
          </p>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="flex items-center gap-3 bg-red-50 dark:bg-red-500/10 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 mb-6 rounded-r-xl text-sm font-medium">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {errorMsg}
          </div>
        )}

        {/* Success Message - Didesain seperti Boarding Pass/Seat Map */}
        {successData && (
          <div className="bg-gradient-to-br from-blue-500 to-sky-600 p-6 mb-8 rounded-2xl text-center transform scale-100 animate-[takeoff_0.5s_ease-out] shadow-lg shadow-blue-500/30 relative overflow-hidden">
            {/* Dekorasi lubang boarding pass */}
            <div className="absolute top-1/2 left-[-10px] w-5 h-5 bg-white dark:bg-slate-800 rounded-full transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-[-10px] w-5 h-5 bg-white dark:bg-slate-800 rounded-full transform -translate-y-1/2"></div>
            
            <h3 className="font-semibold text-blue-50 text-sm uppercase tracking-widest mb-4">Assigned Seats</h3>
            <div className="flex justify-center flex-wrap gap-3">
              {successData.map((seat, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-md text-white border border-white/30 w-16 h-16 flex flex-col items-center justify-center rounded-xl font-bold text-xl shadow-sm hover:bg-white/30 transition-colors"
                >
                  {seat}
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Crew Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600"
                placeholder="e.g. Sarah"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Crew ID</label>
              <input
                type="text"
                name="id"
                required
                value={formData.id}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600"
                placeholder="e.g. 98123"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Flight No.</label>
              <div className="relative">
                <input
                  type="text"
                  name="flightNumber"
                  required
                  value={formData.flightNumber}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all uppercase placeholder-slate-400 dark:placeholder-slate-600"
                  placeholder="GA-102"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Date</label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Aircraft</label>
            <div className="relative">
              <select
                name="aircraft"
                required
                value={formData.aircraft}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 pr-10 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none"
              >
                <option value="ATR">ATR 72-600</option>
                <option value="Airbus 320">Airbus A320</option>
                <option value="Boeing 737 Max">Boeing 737 MAX 8</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-md mt-6 flex items-center justify-center gap-2
              ${loading 
                ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-[0.98]'}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Processing...
              </>
            ) : (
              'Generate Vouchers'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;