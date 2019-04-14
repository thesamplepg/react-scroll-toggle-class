import React, { Component } from 'react';

class ReactAnimation extends Component {
    constructor (props) {
        super(props);

        this.childrenDOMNode = React.createRef();
        this.state = {
            animated: false
        }
    }

    getReworkedChildren () {
        
        if(this.props.className) {
            try {
            
                const children = React.Children.only(this.props.children);
    
                const props = {...children.props};
                props.ref = this.childrenDOMNode;

                if(this.state.animated) {

                    props.className = `${props.className ? props.className + ' ' : ''}${this.props.className}`

                } else props.className = props.className ? props.className : null;
                

                return React.cloneElement(children, props);
    
            } catch (error) {

                throw new Error("ScrollAnimation: More than 1 children were provided");
                
            }
        } else {

            throw new Error("ScrollAnimation: className not provided");

        }
    }


    componentDidMount() {
        this.nodeScroll = this.childrenDOMNode.current.offsetTop - window.innerHeight / 2;

        window.addEventListener('scroll', this.scrollHandler);
    }

    scrollHandler = () => {

        const scroll = this.props.scroll ? this.props.scroll : this.nodeScroll;

        
        if(window.scrollY > scroll && !this.state.animated) {

            this.setState({animated: true});

        } else if (window.scrollY < scroll - window.innerHeight / 1.5 && this.state.animated ) {

            this.setState({animated: false});

        }
    }

    
    render() {

        this.children = this.getReworkedChildren();

        return this.children;

    }
}

export default ReactAnimation;
