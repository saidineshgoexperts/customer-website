'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, MapPin, Clock, DollarSign, User, Calendar, Layers } from 'lucide-react';
import { useRouter } from 'next/navigation';

const staticQuestions = [
    {
        id: 'serviceType',
        question: 'Where would you like the service?',
        options: [
            { value: 'home', label: 'Home Service', icon: '🏠' },
            { value: 'center', label: 'Visit Center', icon: '🏢' },
        ],
    },
    {
        id: 'preferredTime',
        question: 'Preferred Time?',
        options: [
            { value: 'morning', label: 'Morning', icon: '🌅' },
            { value: 'afternoon', label: 'Afternoon', icon: '☀️' },
            { value: 'evening', label: 'Evening', icon: '🌙' },
        ],
    },
    {
        id: 'budget',
        question: 'Budget Range?',
        options: [
            { value: '499-999', label: '₹499–₹999', icon: '💰' },
            { value: '999-1999', label: '₹999–₹1999', icon: '💎' },
            { value: '1999+', label: '₹1999+', icon: '👑' },
        ],
    },
    {
        id: 'genderPreference',
        question: 'Gender Preference for Staff?',
        options: [
            { value: 'female', label: 'Female Staff', icon: '👩' },
            { value: 'male', label: 'Male Staff', icon: '👨' },
            { value: 'any', label: 'Any', icon: '🤝' },
        ],
    },
];

export function QuestionnaireModal({ isOpen, onClose, categoryName, categoryId }) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [questions, setQuestions] = useState(staticQuestions);
    const [loading, setLoading] = useState(false);

    // Fetch Subcategories
    useEffect(() => {
        const fetchSubcategories = async () => {
            // Need a valid categoryId to fetch. If mock/missing, maybe rely on static or just static questions?
            // The user wants it to be like PG.
            if (!isOpen) return;

            setLoading(true);
            try {
                // If using mock category ID or none, maybe skip? 
                // Using fetch anyway.
                const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/professional-services-flow/public/subcategories', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ categoryId })
                });
                const data = await response.json();

                if (data.success && data.data && data.data.length > 0) {
                    const subcatQuestion = {
                        id: 'subcategoryId',
                        question: `Select a ${categoryName} Service`,
                        options: data.data.map(sub => ({
                            value: sub._id,
                            label: sub.name,
                            icon: '✨', // Default icon as API doesn't return emojis usually
                            image: sub.image // Optional: render image if UI supports
                        }))
                    };
                    setQuestions([subcatQuestion, ...staticQuestions]);
                } else {
                    // Fallback or keep existing
                    setQuestions(staticQuestions);
                }
            } catch (error) {
                console.error("Error fetching subcategories", error);
                setQuestions(staticQuestions);
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            fetchSubcategories();
        } else {
            setQuestions(staticQuestions);
        }
    }, [categoryId, isOpen, categoryName]);

    // Reset on close
    useEffect(() => {
        if (!isOpen) {
            setCurrentStep(0);
            setAnswers({});
        }
    }, [isOpen]);

    const currentQuestion = questions[currentStep];
    const progress = ((currentStep + 1) / questions.length) * 100;

    const handleAnswer = (value) => {
        // If selecting subcategory (first step usually), store extra data if needed?
        // Just storing value for now.
        const newAnswers = { ...answers, [currentQuestion.id]: value };
        setAnswers(newAnswers);

        // Auto-advance
        setTimeout(() => {
            if (currentStep < questions.length - 1) {
                setCurrentStep(currentStep + 1);
            }
        }, 300);
    };

    const handleComplete = () => {
        const queryParams = new URLSearchParams({
            category: categoryId,
            ...answers
        });
        // Navigate to results
        router.push(`/spa-salon/results?${queryParams.toString()}`);
        onClose();
        setAnswers({});
        setCurrentStep(0);
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const isLastStep = currentStep === questions.length - 1;
    // Check if current question is answered
    const canProceed = answers[currentQuestion?.id];

    if (!currentQuestion) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-[#E8ECF2] flex flex-col">
                            {/* Header */}
                            <div className="relative p-6 border-b border-[#E8ECF2]">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 text-[#64748B] hover:text-[#0F172A] transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <h2 className="text-2xl font-bold text-[#0F172A] mb-2">
                                    Find your perfect spa service
                                </h2>
                                <p className="text-[#64748B]">
                                    Answer a few quick questions about <span className="text-[#C06C84]">{categoryName}</span>
                                </p>

                                {/* Progress Bar */}
                                <div className="mt-4 bg-[#F6F7FB] rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        className="h-full bg-gradient-to-r from-[#C06C84] to-[#6C5CE7]"
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                                <p className="text-sm text-[#64748B] mt-2">
                                    Step {currentStep + 1} of {questions.length}
                                </p>
                            </div>

                            {/* Question Content */}
                            <div className="p-8 overflow-y-auto">
                                {loading && questions.length === staticQuestions.length ? (
                                    <div className="flex justify-center py-10"><span className="animate-spin text-2xl">⏳</span></div>
                                ) : (
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentStep}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h3 className="text-xl font-semibold text-[#0F172A] mb-6">
                                                {currentQuestion.question}
                                            </h3>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {currentQuestion.options.map((option) => (
                                                    <motion.button
                                                        key={option.value}
                                                        onClick={() => handleAnswer(option.value)}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className={`p-6 rounded-xl border-2 transition-all text-left ${answers[currentQuestion.id] === option.value
                                                            ? 'border-[#C06C84] bg-[#C06C84]/10 shadow-lg shadow-[#C06C84]/20'
                                                            : 'border-[#E8ECF2] bg-[#F6F7FB] hover:border-[#C06C84]/50 hover:bg-[#FBEAF0]'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            {option.image ? (
                                                                <div className="w-12 h-12 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url('https://api.doorstephub.com/${option.image}')` }} />
                                                            ) : (
                                                                <span className="text-3xl">{option.icon}</span>
                                                            )}
                                                            <span className="text-[#0F172A] font-medium">{option.label}</span>
                                                        </div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-[#E8ECF2] flex items-center justify-between mt-auto">
                                <button
                                    onClick={handleBack}
                                    disabled={currentStep === 0}
                                    className="flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    Back
                                </button>

                                {/* Show Results / Next */}
                                {/* Logic: Show "Show Results" if last step OR if we want to allow early exit? Usually last step. */}
                                {isLastStep && canProceed && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleComplete}
                                        className="px-8 py-3 bg-gradient-to-r from-[#C06C84] to-[#6C5CE7] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#C06C84]/50 transition-all flex items-center gap-2"
                                    >
                                        Show Results
                                        <ChevronRight className="w-5 h-5" />
                                    </motion.button>
                                )}
                                {!isLastStep && canProceed && (
                                    <button
                                        onClick={() => setCurrentStep(curr => curr + 1)}
                                        className="flex items-center gap-2 text-[#C06C84] font-medium hover:text-[#6C5CE7]"
                                    >
                                        Next <ChevronRight className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
