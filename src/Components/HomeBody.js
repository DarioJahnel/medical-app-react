import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import './HomeBody.css';

export default function Body(props) {

// CAROUSEL
var items = [
  {
    src: 'https://picsum.photos/500/300/?random',
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header'
  },
  {
    src: 'https://picsum.photos/500/300/?random',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header'
  },
  {
    src: 'https://picsum.photos/500/300/?random',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header'
  }
];

var carousel = () => <UncontrolledCarousel className='col-6 h-75' items={items} />;


return (
  <main>
    {carousel()}
  </main>
);

}