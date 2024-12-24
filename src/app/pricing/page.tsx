import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PricingPage = () => {
    const tiers = [
        {
            name: 'Basic',
            price: '$29',
            interval: '/month',
            description: 'Perfect for individuals and small teams getting started',
            features: [
                'Up to 10 documents',
                'Basic document analysis',
                'Email support',
                'API access',
                '2 team members'
            ],
            buttonText: 'Start Basic',
            popular: false
        },
        {
            name: 'Pro',
            price: '$79',
            interval: '/month',
            description: 'Ideal for growing businesses and teams',
            features: [
                'Up to 100 documents',
                'Advanced document analysis',
                'Priority support',
                'API access with higher limits',
                'Up to 10 team members',
                'Custom integrations',
                'Analytics dashboard'
            ],
            buttonText: 'Start Pro',
            popular: true
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            interval: '',
            description: 'Tailored solutions for large organizations',
            features: [
                'Unlimited documents',
                'Advanced document analysis',
                'Dedicated support',
                'Custom API solutions',
                'Unlimited team members',
                'Custom integrations',
                'Advanced analytics',
                'SLA guarantee',
                'Custom training'
            ],
            buttonText: 'Contact Sales',
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Simple, transparent pricing
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Choose the perfect plan for your needs. All plans include a 14-day free trial.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 mt-16">
                    {tiers.map((tier) => (
                        <Card
                            key={tier.name}
                            className={`relative flex flex-col border-zinc-800 bg-zinc-900/50 ${tier.popular ? 'border-2 border-brand' : ''
                                }`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                    <span className="bg-brand text-white px-3 py-1 rounded-full text-sm font-medium">
                                        Most Popular
                                    </span>
                                </div>
                            )}
                            <CardHeader>
                                <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                                <div className="flex items-baseline text-white">
                                    <span className="text-4xl font-bold tracking-tight">
                                        {tier.price}
                                    </span>
                                    <span className="text-zinc-400 ml-1">{tier.interval}</span>
                                </div>
                                <p className="text-sm text-zinc-400 mt-2">{tier.description}</p>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <ul className="space-y-3">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-center text-zinc-300">
                                            <Check className="h-4 w-4 text-brand mr-2 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className={`w-full ${tier.popular
                                        ? 'bg-brand hover:bg-brand/90 text-white'
                                        : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                                        }`}
                                >
                                    {tier.buttonText}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mt-24">
                    <h2 className="text-2xl font-bold text-white text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                question: 'Can I switch plans later?',
                                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
                            },
                            {
                                question: 'What payment methods do you accept?',
                                answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.'
                            },
                            {
                                question: 'Is there a long-term contract?',
                                answer: 'No, all our plans are month-to-month with no long-term commitment required.'
                            },
                            {
                                question: 'Do you offer custom solutions?',
                                answer: 'Yes, our Enterprise plan can be customized to meet your specific needs. Contact our sales team to learn more.'
                            }
                        ].map(({ question, answer }) => (
                            <Card key={question} className="bg-zinc-900/50 border-zinc-800">
                                <CardHeader>
                                    <h3 className="text-lg font-semibold text-white">{question}</h3>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-zinc-400">{answer}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;