/**
 * SkeletonLoader Component
 * Loading placeholder for service cards and content
 */
export default function SkeletonLoader({ count = 4, type = 'card' }) {
    if (type === 'card') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: count }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse"
                    >
                        {/* Icon placeholder */}
                        <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4" />

                        {/* Title placeholder */}
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />

                        {/* Description placeholders */}
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-5/6" />
                        </div>

                        {/* Button placeholder */}
                        <div className="mt-4 h-10 bg-gray-200 rounded-lg w-full" />
                    </div>
                ))}
            </div>
        );
    }

    if (type === 'list') {
        return (
            <div className="space-y-4">
                {Array.from({ length: count }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse flex items-center gap-4"
                    >
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                        <div className="flex-grow">
                            <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />
                            <div className="h-4 bg-gray-200 rounded w-2/3" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Default text skeleton
    return (
        <div className="space-y-3 animate-pulse">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full" />
            ))}
        </div>
    );
}
