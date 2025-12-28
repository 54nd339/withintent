import { cva } from 'class-variance-authority';

/**
 * Spacing variants using CVA - classes must be static strings for Tailwind to extract
 */
export const spacingVariants = cva('', {
  variants: {
    type: {
      paddingTop: '',
      paddingBottom: '',
      paddingLeft: '',
      paddingRight: '',
      marginTop: '',
      marginBottom: '',
      marginLeft: '',
      marginRight: '',
    },
    size: {
      none: '',
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
      xl2: '',
    },
  },
  compoundVariants: [
    // Padding Top
    { type: 'paddingTop', size: 'xs', class: 'pt-2 sm:pt-3 md:pt-4' },
    { type: 'paddingTop', size: 'sm', class: 'pt-3 sm:pt-4 md:pt-6 lg:pt-8' },
    { type: 'paddingTop', size: 'md', class: 'pt-4 sm:pt-6 md:pt-8 lg:pt-12 xl:pt-16' },
    { type: 'paddingTop', size: 'lg', class: 'pt-6 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-20 2xl:pt-24' },
    { type: 'paddingTop', size: 'xl', class: 'pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24 2xl:pt-28' },
    { type: 'paddingTop', size: 'xl2', class: 'pt-10 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-28 2xl:pt-32' },
    // Padding Bottom
    { type: 'paddingBottom', size: 'xs', class: 'pb-2 sm:pb-3 md:pb-4' },
    { type: 'paddingBottom', size: 'sm', class: 'pb-3 sm:pb-4 md:pb-6 lg:pb-8' },
    { type: 'paddingBottom', size: 'md', class: 'pb-4 sm:pb-6 md:pb-8 lg:pb-12 xl:pb-16' },
    { type: 'paddingBottom', size: 'lg', class: 'pb-6 sm:pb-8 md:pb-12 lg:pb-16 xl:pb-20 2xl:pb-24' },
    { type: 'paddingBottom', size: 'xl', class: 'pb-8 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-24 2xl:pb-28' },
    { type: 'paddingBottom', size: 'xl2', class: 'pb-10 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28 2xl:pb-32' },
    // Padding Left
    { type: 'paddingLeft', size: 'xs', class: 'pl-2 sm:pl-3 md:pl-4' },
    { type: 'paddingLeft', size: 'sm', class: 'pl-3 sm:pl-4 md:pl-6 lg:pl-8' },
    { type: 'paddingLeft', size: 'md', class: 'pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-16' },
    { type: 'paddingLeft', size: 'lg', class: 'pl-6 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-20 2xl:pl-24' },
    { type: 'paddingLeft', size: 'xl', class: 'pl-8 sm:pl-12 md:pl-16 lg:pl-20 xl:pl-24 2xl:pl-28' },
    { type: 'paddingLeft', size: 'xl2', class: 'pl-10 sm:pl-16 md:pl-20 lg:pl-24 xl:pl-28 2xl:pl-32' },
    // Padding Right
    { type: 'paddingRight', size: 'xs', class: 'pr-2 sm:pr-3 md:pr-4' },
    { type: 'paddingRight', size: 'sm', class: 'pr-3 sm:pr-4 md:pr-6 lg:pr-8' },
    { type: 'paddingRight', size: 'md', class: 'pr-4 sm:pr-6 md:pr-8 lg:pr-12 xl:pr-16' },
    { type: 'paddingRight', size: 'lg', class: 'pr-6 sm:pr-8 md:pr-12 lg:pr-16 xl:pr-20 2xl:pr-24' },
    { type: 'paddingRight', size: 'xl', class: 'pr-8 sm:pr-12 md:pr-16 lg:pr-20 xl:pr-24 2xl:pr-28' },
    { type: 'paddingRight', size: 'xl2', class: 'pr-10 sm:pr-16 md:pr-20 lg:pr-24 xl:pr-28 2xl:pr-32' },
    // Margin Top
    { type: 'marginTop', size: 'xs', class: 'mt-2 sm:mt-3 md:mt-4' },
    { type: 'marginTop', size: 'sm', class: 'mt-3 sm:mt-4 md:mt-6 lg:mt-8' },
    { type: 'marginTop', size: 'md', class: 'mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-16' },
    { type: 'marginTop', size: 'lg', class: 'mt-6 sm:mt-8 md:mt-12 lg:mt-16 xl:mt-20 2xl:mt-24' },
    { type: 'marginTop', size: 'xl', class: 'mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 2xl:mt-28' },
    { type: 'marginTop', size: 'xl2', class: 'mt-10 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-28 2xl:mt-32' },
    // Margin Bottom
    { type: 'marginBottom', size: 'xs', class: 'mb-2 sm:mb-3 md:mb-4' },
    { type: 'marginBottom', size: 'sm', class: 'mb-3 sm:mb-4 md:mb-6 lg:mb-8' },
    { type: 'marginBottom', size: 'md', class: 'mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16' },
    { type: 'marginBottom', size: 'lg', class: 'mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20 2xl:mb-24' },
    { type: 'marginBottom', size: 'xl', class: 'mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24 2xl:mb-28' },
    { type: 'marginBottom', size: 'xl2', class: 'mb-10 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-28 2xl:mb-32' },
    // Margin Left
    { type: 'marginLeft', size: 'xs', class: 'ml-2 sm:ml-3 md:ml-4' },
    { type: 'marginLeft', size: 'sm', class: 'ml-3 sm:ml-4 md:ml-6 lg:ml-8' },
    { type: 'marginLeft', size: 'md', class: 'ml-4 sm:ml-6 md:ml-8 lg:ml-12 xl:ml-16' },
    { type: 'marginLeft', size: 'lg', class: 'ml-6 sm:ml-8 md:ml-12 lg:ml-16 xl:ml-20 2xl:ml-24' },
    { type: 'marginLeft', size: 'xl', class: 'ml-8 sm:ml-12 md:ml-16 lg:ml-20 xl:ml-24 2xl:ml-28' },
    { type: 'marginLeft', size: 'xl2', class: 'ml-10 sm:ml-16 md:ml-20 lg:ml-24 xl:ml-28 2xl:ml-32' },
    // Margin Right
    { type: 'marginRight', size: 'xs', class: 'mr-2 sm:mr-3 md:mr-4' },
    { type: 'marginRight', size: 'sm', class: 'mr-3 sm:mr-4 md:mr-6 lg:mr-8' },
    { type: 'marginRight', size: 'md', class: 'mr-4 sm:mr-6 md:mr-8 lg:mr-12 xl:mr-16' },
    { type: 'marginRight', size: 'lg', class: 'mr-6 sm:mr-8 md:mr-12 lg:mr-16 xl:mr-20 2xl:mr-24' },
    { type: 'marginRight', size: 'xl', class: 'mr-8 sm:mr-12 md:mr-16 lg:mr-20 xl:mr-24 2xl:mr-28' },
    { type: 'marginRight', size: 'xl2', class: 'mr-10 sm:mr-16 md:mr-20 lg:mr-24 xl:mr-28 2xl:mr-32' },
  ],
});
