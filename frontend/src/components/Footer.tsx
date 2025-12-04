export default function Footer() {
    return (
        <footer className="py-12 bg-white dark:bg-black border-t border-gray-100 dark:border-zinc-800">
            <div className="container mx-auto px-6 text-center">
                <div className="flex justify-center gap-6 mb-8">
                    {/* Social Links could go here */}
                </div>
                <p className="text-gray-500 text-sm">
                    © 2025 GDG Ogbomoso. All rights reserved. <br />
                    Google Developer Groups is an independent group; our activities and the opinions expressed here should in no way be linked to Google, the corporation.
                </p>
            </div>
        </footer>
    );
}
