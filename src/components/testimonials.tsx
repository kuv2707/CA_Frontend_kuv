import React, { useState, useEffect } from 'react';
import { Box, Center, useMediaQuery } from '@chakra-ui/react';
import Testes from './testemonialCard';

interface CarouselData {
  title: string;
  description: string;
  imageSrc: string;
}

const carouselData: CarouselData[] = [
  {
    title: 'Adolf Hitler',
    description:
      'HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!HEIL!Kill!Kill!Kill!Kill!Kill!Kill!Kill!Kill!Kill!Kill!Kill!',
    imageSrc:
      'https://upload.wikimedia.org/wikipedia/en/7/7d/Adolf_Hitler_cph_3a48970.jpg', // URL for the image
  },
  {
    title: 'Mr Bonaparte',
    description:
      "There's nothing we can do.There's nothing we can do.There's nothing we can do.There's nothing we can do.There's nothing we can do.There's nothing.",
    imageSrc:
      'https://assets.editorial.aetnd.com/uploads/2022/11/napoleon-exile-gettyimages-1288489073.jpg', // URL for the image
  },
  {
    title: 'Jordan Belfort',
    description:
      'I have been a rich man and I have been a poor man. And I will choose rich EVERY FUCKING TIMEEE!!Is anyone carrying some LSD by chance? I forgot to bring mine.',
    imageSrc:
      'https://i.pinimg.com/564x/91/8e/7a/918e7a39b2d71bd85d3e26cf6b42a1ec.jpg', // URL for the image
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)');
  const [isLargerThan500] = useMediaQuery('(min-width: 500px)');
  const height3 = isLargerThan500 ? '100px' : '14vw';
  const height1 = isLargerThan900 ? '420px' : '60vw';
  const height2 = isLargerThan900 ? '400px' : '60vw';
  const padding = isLargerThan900 ? '2vw' : '6vw';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div>
      <Center h={height3} className='mb-5'>
        {/* Center the content vertically */}
        <Box
          textAlign='center'
          className='flex flex-col -space-y-11 ef:-space-y-16 md:-space-y-28 lg:-space-y-32'
        >
          {/* Center the content horizontally */}
          <span className='text-[40px] text-red opacity-20 ef:text-[80px] md:text-[8rem] lg:text-[11rem]'>
            Testimonials
          </span>
          <span className='text-white z-10 ml-3 transform select-none text-[25px] transition duration-700 hover:scale-110 ef:text-4xl md:text-7xl'>
            Testimonials
          </span>
        </Box>
      </Center>
      <Center>
        <div
          style={{ position: 'relative', height: `${height1}`, width: '90%' }}
        >
          <Box
            position='relative'
            height={height2}
            width='auto'
            overflow='hidden'
            id='box'
            paddingLeft={padding}
          >
            <Box
              transition='transform 0.5s ease'
              transform={`translateY(-${
                (currentIndex * 100) / carouselData.length
              }%)`}
              position='absolute'
              width='100%'
              display='flex'
              flexDirection='column'
            >
              {carouselData.map((item, currentIndex) => (
                <Testes
                  key={currentIndex}
                  title={carouselData[currentIndex]['title']}
                  description={carouselData[currentIndex]['description']}
                  imageSrc={carouselData[currentIndex]['imageSrc']}
                />
              ))}
            </Box>
          </Box>
          <Center>
            <div
              style={{
                height: '3px',
                borderRadius: '3px',
                background: '#a81f25',
                width: '80%',
                marginTop: '3vw',
              }}
            ></div>
          </Center>
        </div>
      </Center>
    </div>
  );
};

export default Testimonials;
