// components/ImageCard.jsx
import Image from 'next/image';
import { BriefcaseBusiness, ChartNoAxesColumn, GraduationCap, Landmark, Users } from 'lucide-react';

/**
 * ImageCard Component
 * Renders a grid of cards with icons, titles, and descriptions.
 *
 * @param {Object[]} arr - Array of card data objects
 * @param {string} arr[].id - Unique identifier
 * @param {string} arr[].title - Card title
 * @param {string} arr[].description - Card description
 * @param {string} arr[].img - Image path (local or URL)
 */
const ImageCard = ({ arr }) => {
  const getIcon = (iconClass) => {
    if (iconClass?.includes('graduation')) return GraduationCap;
    if (iconClass?.includes('university')) return Landmark;
    if (iconClass?.includes('chart-line')) return ChartNoAxesColumn;
    if (iconClass?.includes('briefcase')) return BriefcaseBusiness;
    return Users;
  };

  return (
    <div className="grid grid-cols-1 items-stretch justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
      {arr.map(({ id, title, description, img, icon }) => (
        <div className="flex justify-center" key={id}>
          <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div>
              <Image
                alt={`${title} | HRMate`}
                src={img}
                width={1200}
                height={800}
                className="mb-1 h-48 w-full object-cover"
                sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="p-5">
              {icon && (() => {
                const Icon = getIcon(icon);
                return (
                  <span className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                    <Icon size={20} />
                  </span>
                );
              })()}
              <h3 className="mb-2 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="p-1 text-justify text-slate-600">{description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageCard;
