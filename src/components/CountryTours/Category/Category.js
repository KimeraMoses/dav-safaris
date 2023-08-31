import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Skeleton } from '@material-ui/lab';
import classes from '../CountrySingle.module.css';
import PopularTours from '../../HomePage/PopularTours/PopularTours';
import SectionTitle from '../../HomePage/SectionTitle/SectionTitle';
import SEO from '../../../containers/SEO/SEO';
import DescriptionSection from '../DescriptionSection';
import { useCountryTours } from '../../../hooks';
import { useCategoryBySlug } from '../../../hooks';
import { useCountry } from '../../../hooks';

const categoryMeta = {
  'tanzania-wildlife-safaris': {
    title: 'Wildlife Safaris Tanzania, Luxury Wildlife Park in Tanzania',
    description:
      "Wildlife safaris Tanzania offers adventurous travelers the opportunity to see Tanzania's amazing wildlife park and visit spectacular natural beauty.",
    keywords: 'wildlife park in tanzania, wildlife safaris tanzania',
  },
  'kenya-wildlife-safaris': {
    title: 'Kenya Wildlife Safaris, Kenya Wildlife Tours & Travels',
    description:
      'Our Kenya wildlife safaris offer you enjoy your holiday at the best destination in Kenya. Visit us and experience incredible wildlife at an affordable cost.',
    keywords: 'kenya wildlife safaris, kenya wildlife safari',
  },
  'rwanda-gorilla-wildlife-safaris': {
    title: 'Gorilla Safaris in Rwanda, Gorilla Safaris Tour & Travels Rwanda',
    description:
      'Tours and Travel Agency offer the best luxurious gorilla safaris in Rwanda. Plan your trip with us and enjoy gorilla Rwanda wildlife Safaris.',
    keywords: 'gorilla safaris in rwanda',
  },
};

const Category = () => {
  const { countryName, tourCategory } = useParams();
  const { category, isLoading: categoryIsLoading } =
    useCategoryBySlug(tourCategory);

  const { country } = useCountry(countryName);

  useEffect(() => {
    window.scrollTo(0, 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourCategory]);

  const { countryTours, isLoading } = useCountryTours(country?.name);

  const SelectedCategory = category;
  const FilteredTours = countryTours.filter(
    (tour) => tour.category === tourCategory
  );

  return (
    <>
      {categoryMeta[tourCategory] && (
        <SEO
          title={categoryMeta[tourCategory]?.title}
          description={categoryMeta[tourCategory]?.description}
          keywords={categoryMeta[tourCategory]?.keywords}
        />
      )}
      {categoryIsLoading ? (
        <div className={classes.dav__country_single_wrapper}>
          <div className={classes.dav__single_tour_hero}>
            <Skeleton
              variant='rectangular'
              width='100%'
              height={360}
            ></Skeleton>
          </div>
          <div className={classes.dav__country_tours_wrapper}>
            <div
              style={{
                margin: '5px',
              }}
            >
              {' '}
              <div
                style={{
                  margin: '5px',
                }}
              >
                <Skeleton
                  variant='rectangular'
                  width='80%'
                  height={40}
                ></Skeleton>
              </div>
              <div
                style={{
                  margin: '5px',
                }}
              >
                <Skeleton
                  variant='rectangular'
                  width='60%'
                  height={20}
                ></Skeleton>
              </div>
              <div
                style={{
                  margin: '5px',
                }}
              >
                <Skeleton
                  variant='rectangular'
                  width='40%'
                  height={10}
                ></Skeleton>
              </div>
            </div>

            <PopularTours tours={FilteredTours} isLoading={isLoading} />
          </div>
        </div>
      ) : (
        <div className={classes.dav__country_single_wrapper}>
          <div
            className={classes.dav__single_tour_hero}
            style={{
              backgroundImage: `url(${
                SelectedCategory && SelectedCategory.tourCategoryImage
              })`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }}
          >
            <h1>{SelectedCategory?.name}</h1>
          </div>
          <div className={classes.dav__country_tours_wrapper}>
            {SelectedCategory?.description && (
              <DescriptionSection
                description={SelectedCategory.description}
                specialist='+256757795781'
              />
            )}
            <SectionTitle
              subTitle='Exciting tours in '
              Title={`${SelectedCategory && SelectedCategory.name} Category`}
              isLoading={isLoading}
            />
            <PopularTours tours={FilteredTours} isLoading={isLoading} />
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
