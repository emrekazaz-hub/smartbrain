import React from 'react';
import ImageLoader from './ImageLoader';

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPending: true
    };
  }

  handleImageLoaded = () => {
    this.setState({ isPending: false });
  }

  handleImageError = () => {
    this.setState({ isPending: false });
  }

  render() {
    const { src, alt } = this.props;
    const { isPending } = this.state;

    return (
      <div className="image-container">
        {isPending && <ImageLoader />}
        <img
          src={src}
          alt={alt}
          onLoad={this.handleImageLoaded}
          onError={this.handleImageError}
          style={{ display: isPending ? 'none' : 'block' }}
        />
      </div>
    );
  }
}

export default Image;
