import { Avatar } from "@heroui/react";
import { TEAM } from "../data";

export default function Team() {
    return (
        <section className="py-20 bg-gray-50 dark:bg-zinc-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Meet the Team</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        The passionate individuals working behind the scenes to make DevFest Ogbomoso a reality.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    {TEAM.map((member, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="relative mb-4">
                                <div className="absolute inset-0 bg-gradient-to-tr from-devfest-blue to-devfest-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
                                <Avatar
                                    src={member.image_url}
                                    className="w-32 h-32 text-large relative z-10 border-4 border-white dark:border-zinc-900"
                                />
                            </div>
                            <h3 className="font-bold text-lg">{member.name}</h3>
                            <p className="text-sm text-gray-500">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
