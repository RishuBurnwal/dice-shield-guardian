import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				dice: {
					defend: 'hsl(var(--dice-defend))',
					'defend-foreground': 'hsl(var(--dice-defend-foreground))',
					investigate: 'hsl(var(--dice-investigate))',
					'investigate-foreground': 'hsl(var(--dice-investigate-foreground))',
					contain: 'hsl(var(--dice-contain))',
					'contain-foreground': 'hsl(var(--dice-contain-foreground))',
					evolve: 'hsl(var(--dice-evolve))',
					'evolve-foreground': 'hsl(var(--dice-evolve-foreground))'
				},
				status: {
					safe: 'hsl(var(--status-safe))',
					warning: 'hsl(var(--status-warning))',
					danger: 'hsl(var(--status-danger))',
					info: 'hsl(var(--status-info))'
				}
			},
			backgroundImage: {
				'gradient-dice': 'var(--gradient-dice)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-shield': 'var(--gradient-shield)',
				'gradient-cyber': 'var(--gradient-cyber)'
			},
			boxShadow: {
				'dice': 'var(--shadow-dice)',
				'glow': 'var(--shadow-glow)',
				'elevated': 'var(--shadow-elevated)',
				'shield': 'var(--shadow-shield)',
				'cyber': 'var(--shadow-cyber)'
			},
			transitionTimingFunction: {
				'smooth': 'var(--transition-smooth)',
				'bounce': 'var(--transition-bounce)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-dice': {
					'0%, 100%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '0.8',
						transform: 'scale(1.05)'
					}
				},
				'rotate-dice': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'glow': {
					'0%, 100%': {
						boxShadow: '0 0 5px hsl(var(--dice-defend) / 0.3)'
					},
					'50%': {
						boxShadow: '0 0 20px hsl(var(--dice-defend) / 0.6)'
					}
				},
				'shield-pulse': {
					'0%, 100%': {
						transform: 'scale(1)',
						boxShadow: '0 0 20px hsl(var(--dice-defend) / 0.3)'
					},
					'50%': {
						transform: 'scale(1.05)',
						boxShadow: '0 0 40px hsl(var(--dice-defend) / 0.6)'
					}
				},
				'data-flow': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'cyber-scan': {
					'0%': { opacity: '0.3', transform: 'scaleY(0.1)' },
					'50%': { opacity: '1', transform: 'scaleY(1)' },
					'100%': { opacity: '0.3', transform: 'scaleY(0.1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-dice': 'pulse-dice 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'rotate-dice': 'rotate-dice 8s linear infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'shield-pulse': 'shield-pulse 3s ease-in-out infinite',
				'data-flow': 'data-flow 2s linear infinite',
				'cyber-scan': 'cyber-scan 4s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;