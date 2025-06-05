import React from 'react';
import { MainLayout } from '../../shared/layout/MainLayout';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import { toast } from 'react-toastify';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import '../../../scss/Profile.scss';

const Profile = () => {
    const { auth, csrfToken } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        name: auth.user.name || '',
        email: auth.user.email || '',
        phone: auth.user.phone || '',
        city: auth.user.city || '',
        country: auth.user.country || '',
        postal_code: auth.user.postal_code || ''
    });
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        put('/user/profile-information', {
            onSuccess: () => {
                toast.success('Profile updated', { className: 'woodsplitter-toast' })
            },
            onError: (e) => {
                // @ts-ignore
                Object.values(e).flat().forEach(msg => toast.error(msg, {
                    className: 'woodsplitter-toast',
                }));
            },
        })
    };

    return <div className="profile">
            <h1 className="profile__title">Profile</h1>
            <TabGroup>
                <TabList className="profile__tabs">
                    <Tab className={({ selected }) => selected ? 'profile__tabs-tab--active' : 'profile__tabs-tab'}>Profile Info</Tab>
                    <Tab className={({ selected }) => selected ? 'profile__tabs-tab--active' : 'profile__tabs-tab'}>Orders</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                    <form onSubmit={submit} className="profile__form">
                        <input type="hidden" name="_token" value={csrfToken} />
                        <input
                            type="name"
                            placeholder="Volodymyr Bocharov Yuriiovych"
                            className="profile__form-name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            className="profile__form-email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                        />
                        <input
                            type="phone"
                            placeholder="phone"
                            className="profile__form-phone"
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                        />            
                        <input
                            type="city"
                            placeholder="city"
                            className="profile__form-city"
                            value={data.city}
                            onChange={e => setData('city', e.target.value)}
                        />
                        <input
                            type="country"
                            placeholder="country"
                            className="profile__form-country"
                            value={data.country}
                            onChange={e => setData('country', e.target.value)}
                        />
                        <input
                            type="postal_code"
                            placeholder="postal code"
                            className="profile__form-postal_code"
                            value={data.postal_code}
                            onChange={e => setData('postal_code', e.target.value)}
                        />
                        <button
                            type="submit"
                            className="profile__form-submit"
                            disabled={processing}
                        >Update</button>
                    </form>
                    </TabPanel>
                    <TabPanel>
                        <div className="profile__orders" tabIndex={0}>
                            {/* {Array.from({ length: 100 }, (_, i) => i + 1).map(order => (
                                <Link href={`/orders/${order}`}>
                                    <div className="orders__item">
                                        <div className="orders__item-number">{100 - order}</div>
                                        <div className="orders__item-date">202{order}-01-01</div>
                                        <div className="orders__item-status">Status: Pending</div>
                                    </div>
                                </Link>
                            ))} */}
                            <h1>No orders yet <br /> -&gt; <Link href="/catalog">Catalog</Link> &#60;-</h1>
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>


            <div className="profile__links">
                <Link href="/catalog">Catalog</Link>
                <Link href="/">Main</Link>
            </div>
    </div>;
};


Profile.layout = (page: React.ReactNode) => <MainLayout hideHeaderFooter>{page}</MainLayout>;

export default Profile;

