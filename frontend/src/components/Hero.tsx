import { Button } from "@heroui/react";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black border-b-4 border-black dark:border-white">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-20 left-10 w-32 h-32 bg-devfest-blue border-4 border-black dark:border-white shadow-neo" />
                <div className="absolute bottom-40 right-20 w-48 h-48 bg-devfest-yellow rounded-full border-4 border-black dark:border-white shadow-neo" />
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-devfest-red rotate-45 border-4 border-black dark:border-white shadow-neo" />
                <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-devfest-green rounded-full border-4 border-black dark:border-white shadow-neo opacity-50" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-2 px-4 bg-devfest-green text-white font-bold text-sm mb-6 border-2 border-black dark:border-white shadow-neo-sm transform -rotate-2">
                        Dec 5-6, 2025 • Ogbomoso, Nigeria
                    </span>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 uppercase leading-none">
                        DevFest <br />
                        <span className="flex flex-col sm:flex-row items-center justify-center">
                            <span className="text-devfest-blue text-stroke-black">
                                Ogbomoso
                            </span>
                            <span className="text-devfest-red ml-4">2025</span>
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-black dark:text-white max-w-2xl mx-auto mb-10 leading-relaxed border-2 border-black dark:border-white p-6 bg-white dark:bg-black shadow-neo">
                        Building Safe, Secure and Scalable Solutions with AI and Cloud.
                        Join us for the biggest tech festival in Ogbomoso.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Button
                            size="lg"
                            className="bg-devfest-yellow text-black font-black px-8 py-6 text-xl rounded-none border-4 border-black shadow-neo hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all"
                            onPress={() => document.getElementById("speakers")?.scrollIntoView({ behavior: "smooth" })}
                        >
                            SPEAKERS
                        </Button>
                        <Button
                            size="lg"
                            variant="flat"
                            className="bg-white dark:bg-black text-black dark:text-white font-black px-8 py-6 text-xl rounded-none border-4 border-black dark:border-white shadow-neo hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all"
                            onPress={() => document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" })}
                        >
                            VIEW SCHEDULE
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
