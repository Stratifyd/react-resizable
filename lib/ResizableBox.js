// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Resizable from './Resizable';
import type {Props as ResizableProps, ResizeCallbackData} from './Resizable';
import type {Node as ReactNode} from 'react';

type State = {width: number, height: number};

// An example use of Resizable.
export default class ResizableBox extends React.Component<ResizableProps, State> {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number
  };

  static defaultProps = {
    handleSize: [20,20]
  };

  state: State = {
    width: this.props.width,
    height: this.props.height,
  };

  onResize = (e: SyntheticEvent<>, data: ResizeCallbackData) => {
    const {size} = data;
    const {width, height} = size;

    if (this.props.onResize) {
      e.persist && e.persist();
      this.setState(size, () => this.props.onResize && this.props.onResize(e, data));
    } else {
      this.setState(size);
    }
  };

  componentWillReceiveProps(nextProps: ResizableProps) {

		var { props } = this;
		var { width, height } = props;
		if ( (!isNaN(width) && nextProps.width !== width) ||
				 (!isNaN(height) &&  nextProps.height !== height ) ) {
      this.setState({
        width: nextProps.width,
        height: nextProps.height
      });
    }
	}
	
	componentDidMount() {

		var { state } = this;
		var { width, height } = state;
		if( undefined === width || undefined === height ) {
			var box = this.refs.box;
			var change = {};
			if( undefined === width ) {
				change.width = box.offsetWidth;
			}
			if( undefined === height ) {
				change.height = box.offsetHeight;
			}
			this.setState(change);
		}

	}

  render(): ReactNode {
    // Basic wrapper around a Resizable instance.
    // If you use Resizable directly, you are responsible for updating the child component
    // with a new width and height.
    const {handleSize, onResize, onResizeStart, onResizeStop, draggableOpts,
         minConstraints, maxConstraints, lockAspectRatio, axis, width, height, ...props} = this.props;
    return (
      <Resizable
        handleSize={handleSize}
        width={this.state.width}
        height={this.state.height}
        onResizeStart={onResizeStart}
        onResize={this.onResize}
        onResizeStop={onResizeStop}
        draggableOpts={draggableOpts}
        minConstraints={minConstraints}
        maxConstraints={maxConstraints}
        lockAspectRatio={lockAspectRatio}
        axis={axis}
        >
        <div ref='box' style={{width: this.state.width + 'px', height: this.state.height + 'px'}} {...props} />
      </Resizable>
    );
  }
}
