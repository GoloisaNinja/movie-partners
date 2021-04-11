import React from 'react';

const Modal = ({ show, handleClose, handleDismiss, content }) => {
	return (
		show && (
			<>
				<div className='modalStyle'>
					<div>
						<img className='modal-icon' src={content.icon} alt='logo' />
					</div>

					<h2 style={{ marginBottom: '2rem' }}>
						<span className='pink-span'>{content.title}</span>
					</h2>
					<p style={{ marginBottom: '2rem' }}>{content.body}</p>
					<div className='buttonDiv'>
						{content.type === 'decision' ? (
							<>
								<button
									className='modalButton1'
									onClick={(e) => handleClose(false)}>
									cancel
								</button>
								<button
									className='modalButton2'
									onClick={(e) => handleClose(true)}>
									confirm
								</button>
							</>
						) : (
							<>
								<button
									className='modalDismissButton1'
									onClick={(e) => handleDismiss()}>
									dismiss
								</button>
							</>
						)}
					</div>
				</div>
				<div className='modalOverlay'></div>
			</>
		)
	);
};
export default Modal;
