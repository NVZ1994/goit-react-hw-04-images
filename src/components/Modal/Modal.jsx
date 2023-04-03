import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Modal.css'

export class Modal extends Component {
    static propTypes = {
        closeModal: PropTypes.func.isRequired,
        picture: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
    }

    componentDidMount() {
      window.addEventListener('keydown', this.handleEscape)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleEscape)
    }
    
    handleEscape = (event) => {
        if (event.code === 'Escape') {
            this.props.closeModal()
        }
    }

    closeModal = (event) => {
        if (event.target === event.currentTarget) {
            this.props.closeModal()
        }
    }

    render() {
        const { picture, alt } = this.props
        
        return (
            <div className='Overlay' onClick={this.closeModal}>
                <div className='Modal'>
                    <img src={picture} alt={alt} />
                </div>
            </div>
        )
    }
}