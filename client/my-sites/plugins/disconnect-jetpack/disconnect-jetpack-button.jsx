/**
 * External dependencies
 */
import React from 'react';
import { assign, omit } from 'lodash';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import DisconnectJetpackDialog from 'my-sites/plugins/disconnect-jetpack/disconnect-jetpack-dialog';
import analytics from 'lib/analytics';

export default React.createClass( {

	displayName: 'DisconnectJetpackButton',

	propTypes: {
		site: React.PropTypes.object.isRequired,
		redirect: React.PropTypes.string.isRequired,
		disabled: React.PropTypes.bool,
		linkDisplay: React.PropTypes.bool,
		isMock: React.PropTypes.bool,
		text: React.PropTypes.string
	},

	getDefaultProps() {
		return {
			linkDisplay: true
		};
	},

	render() {
		const { site, redirect, linkDisplay } = this.props;

		const buttonClasses = classNames( {
			button: true,
			'disconnect-jetpack-button': true,
			'is-link': linkDisplay
		} );

		const omitProps = [ 'site', 'redirect', 'isMock', 'linkDisplay' ];
		const buttonProps = assign( {}, ...omit( this.props, omitProps ), {
			id: `disconnect-jetpack-${ site.ID }`,
			className: buttonClasses,
			compact: true,
			disabled: this.props.disabled,
			scary: true,
			onClick: ( event ) => {
				event.preventDefault();
				if ( this.props.isMock ) {
					return;
				}
				this.refs.dialog.open();
				analytics.ga.recordEvent( 'Jetpack', 'Clicked To Open Disconnect Jetpack Dialog' );
			}
		} );

		let { text } = this.props;

		if ( ! text ) {
			text = this.translate( 'Disconnect', {
				context: 'Jetpack: Action user takes to disconnect Jetpack site from .com'
			} );
		}

		const buttonChildren = (
			<div>
				{ text }
				<DisconnectJetpackDialog site={ site } ref="dialog" redirect={ redirect } />
			</div>
		);

		return React.createElement( Button, buttonProps, buttonChildren );
	}
} );
