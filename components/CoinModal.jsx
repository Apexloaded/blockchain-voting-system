import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { abouts } from './About';

function CoinModal({header, description, price, setIsOpen, isOpen, modalToken}) {
    const closeModal = () => {
        setIsOpen(false);
    }
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto"
                onClose={closeModal}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-xl max-h-[50rem] my-8 overflow-scroll text-left align-middle transition-all transform bg-gray-900 shadow-2xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-lg p-4 flex top-0 sticky z-20 bg-opacity-80 justify-between items-center leading-6 m-0 dark:text-gray-100 text-gray-900"
                            >
                                <span className='font-bold'>{modalToken} INFO</span>
                                <p>${price && price}</p>
                            </Dialog.Title>
                            <div className='relative pb-4'>
                                <div className='flex h-full w-full px-4 text-gray-500'>
                                    {description && description.about}
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default CoinModal