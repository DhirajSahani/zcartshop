import { assets, features } from '../assets/assets';

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      {/* Banner Images */}
      <img
        src={assets.bottom_banner_image}
        alt="Bottom banner for desktop"
        className="w-full hidden md:block"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="Bottom banner for mobile"
        className="w-full md:hidden"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24 px-4">
        <p className="text-2xl md:text-3xl font-semibold text-primary mb-4 text-center md:text-right drop-shadow-sm">
          Why We Are the Best?
        </p>

        <div className="space-y-4 md:space-y-2 w-full md:w-auto max-w-xl md:max-w-md">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <img
                src={feature.icon}
                alt={`${feature.title} icon`}
                className="md:w-11 w-9"
              />
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-black md:text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-100 md:text-gray-500/80 text-xs md:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
