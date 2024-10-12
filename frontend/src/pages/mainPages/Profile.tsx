import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../config';

interface SocialHandles {
  instagram?: string | undefined;
  linkedin?: string | undefined;
}

interface Profile {
  id: number | undefined;
  bio?: string;
  avatarUrl?: string | undefined;
  website?: string;
  socialHandles?: SocialHandles;
  user: {
    name: string;
    username: string;
  };
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        if (!response) {
          throw new Error('Failed to fetch profile');
        }

        const profileData = response.data;
        if (typeof profileData.socialHandles === 'string') {
          profileData.socialHandles = JSON.parse(profileData.socialHandles);
        }

        setProfile(profileData);
        setBio(profileData.bio || '');
        setWebsite(profileData.website || '');
        setInstagram(profileData.socialHandles?.instagram || '');
        setLinkedin(profileData.socialHandles?.linkedin || '');
      } catch (error: any) {
        console.error('Error fetching profile:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const updatedProfile: Profile = {
        id: profile?.id || 0, 
        user: profile?.user || { name: '', username: '' }, 
        bio,
        website,
        socialHandles: { instagram, linkedin },
        avatarUrl: profile?.avatarUrl, 
      };
  
      await axios.post(`${BACKEND_URL}/api/v1/user/profile`, updatedProfile, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
    }
  };
  if(isLoading){
    return (
      <div className="flex items-center justify-center w-full h-screen bg-white">
        <div className="loader"></div>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-4xl font-bold text-center">Profile</h1>
        <div className="flex flex-col items-center mb-6">
          {/* <img
            src={profile?.avatarUrl || 'https://via.placeholder.com/150'}
            alt="Avatar"
            className="w-32 h-32 mb-4 rounded-full shadow-md"
          /> */}
          <h2 className="text-2xl font-semibold">{profile?.user.name || 'No Name Available'}</h2>
          <p className="text-gray-600">{profile?.user.username}</p>
          <p className="italic text-gray-500">{profile?.bio || 'No Bio Available'}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Website</h3>
          <p className="text-gray-600">
            {profile?.website ? (
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {profile.website}
              </a>
            ) : (
              'No Website Provided'
            )}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Social Handles</h3>
          <ul className="space-y-2 text-gray-600">
            {profile?.socialHandles?.instagram && (
              <li>
                <span className="font-semibold">Instagram:</span>
                <a
                  href={profile.socialHandles.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {profile.socialHandles.instagram}
                </a>
              </li>
            )}
            {profile?.socialHandles?.linkedin && (
              <li>
                <span className="font-semibold">LinkedIn:</span>
                <a
                  href={profile.socialHandles.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {profile.socialHandles.linkedin}
                </a>
              </li>
            )}
          </ul>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 mt-4 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
        >
          Update Profile
        </button>

        {isEditing && (
          <div className="p-4 mt-6 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="mb-2 text-xl font-semibold">Update Profile</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Update Bio"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Update Website"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="Update Instagram Handle"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="Update LinkedIn Profile"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleUpdateProfile}
                className="w-full px-4 py-2 font-semibold text-white transition duration-300 bg-green-600 rounded-lg shadow-md hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
