import { UniversityPageService } from '@/services/university.page.service'

export interface University {
  id: string
  name: string
  rating: number
  studentCount: number
  description: string
  about: string
  location: string
  majorCount: number
  categories: Array<{ label: string; color: 'blue' | 'green' | 'purple' }>
  stats: {
    facilities: number
    teachers: number
    tuition: number
  }
  enrollmentTrend: { month: string; students: number }[]
  strengths: {
    facilities: number
    career: number
    social: number
    teacher: number
  }
  reviews: Review[]
}

export interface Review {
  id: string
  major: string
  difficulty: 'Easy' | 'Hard'
  teacher: string
  content: string
  author: string
  date: string
  rating: number
}

export interface CommunityPost {
  id: string
  content: string
  author: string
  date: string
  status: 'Pending AI' | 'Published' | 'Admin Review'
  votes: number
  trending: boolean
}

export interface UserProfile {
  id: string
  username: string
  email: string
  avatar: string
  bio: string
  isVerified: boolean
  isTop100: boolean
  joinDate: string
  totalReviews: number
  totalPosts: number
  followers: number
}

export interface Notification {
  id: string
  type: 'reply' | 'like' | 'follow'
  title: string
  content: string
  author: string
  date: string
  isRead: boolean
  blogPostId?: string
  avatar?: string
}

export interface UserActivity {
  id: string
  type: 'review' | 'post' | 'reply' | 'like'
  description: string
  target: string
  date: string
}

const reviewsData: Review[] = [
  {
    id: '1',
    major: 'Computer Science',
    difficulty: 'Hard',
    teacher: 'Prof. Nguyễn',
    content: 'Great courses but requires dedication. Lots of coding assignments.',
    author: 'Anonymous',
    date: '2024-04-15',
    rating: 4.5,
  },
  {
    id: '2',
    major: 'Business Administration',
    difficulty: 'Easy',
    teacher: 'Dr. Trần',
    content: 'Good fundamentals, interesting case studies.',
    author: 'Anonymous',
    date: '2024-04-10',
    rating: 4,
  },
  {
    id: '3',
    major: 'Engineering',
    difficulty: 'Hard',
    teacher: 'Prof. Phạm',
    content: 'Challenging but very rewarding. Excellent facilities.',
    author: 'Anonymous',
    date: '2024-04-08',
    rating: 4.8,
  },
  {
    id: '4',
    major: 'Marketing',
    difficulty: 'Easy',
    teacher: 'Assoc. Prof. Lê',
    content: 'Creative and practical. Good connections with industry.',
    author: 'Anonymous',
    date: '2024-04-05',
    rating: 4.2,
  },
  {
    id: '5',
    major: 'Finance',
    difficulty: 'Hard',
    teacher: 'Dr. Hoàng',
    content: 'Rigorous curriculum. Very helpful instructors.',
    author: 'Anonymous',
    date: '2024-04-01',
    rating: 4.6,
  },
]

const communityPostsData: CommunityPost[] = [
  {
    id: '1',
    content: 'Anyone else struggling with the new CS curriculum? The workload is insane!',
    author: 'Anonymous',
    date: '2024-04-20',
    status: 'Published',
    votes: 42,
    trending: true,
  },
  {
    id: '2',
    content: 'Best café on campus is the one near the library. Great coffee!',
    author: 'Anonymous',
    date: '2024-04-19',
    status: 'Published',
    votes: 28,
    trending: true,
  },
  {
    id: '3',
    content: 'Just got accepted! So excited to start next semester.',
    author: 'Anonymous',
    date: '2024-04-18',
    status: 'Published',
    votes: 15,
    trending: false,
  },
  {
    id: '4',
    content: 'The new dormitory facilities are amazing!',
    author: 'Anonymous',
    date: '2024-04-17',
    status: 'Published',
    votes: 23,
    trending: false,
  },
]

export const universities: University[] = [
  {
    id: '1',
    name: 'Vietnam National University - Hanoi',
    rating: 4.8,
    studentCount: 8500,
    description: 'Top-ranked university in Vietnam with strong academic programs',
    location: 'Hanoi, Vietnam',
    majorCount: 50,
    categories: [
      { label: 'Major', color: 'blue' },
      { label: 'Facility', color: 'green' },
      { label: 'Confession', color: 'purple' },
    ],
    about: 'Vietnam National University - Hanoi (VNU) is one of the oldest and most prestigious universities in Vietnam. Founded in 1956, VNU has been a leading institution for higher education and research in the country. The university offers a wide range of programs across sciences, humanities, social sciences, and technology.\n\nWith over 8,500 students and a dedicated faculty of experts, VNU is committed to providing world-class education that prepares students for global careers. The campus features modern facilities including research laboratories, libraries, and recreational centers. VNU emphasizes research excellence and has established partnerships with leading universities and organizations worldwide.\n\nThe university is particularly known for its strong engineering, science, and business programs. Students benefit from an interdisciplinary approach to learning and have opportunities for internships and collaborations with industry partners.',
    stats: {
      facilities: 4.7,
      teachers: 4.8,
      tuition: 3.5,
    },
    strengths: {
      facilities: 92,
      career: 88,
      social: 85,
      teacher: 94,
    },
    enrollmentTrend: [
      { month: 'Jan', students: 8000 },
      { month: 'Feb', students: 8100 },
      { month: 'Mar', students: 8250 },
      { month: 'Apr', students: 8400 },
      { month: 'May', students: 8500 },
      { month: 'Jun', students: 8600 },
    ],
    reviews: reviewsData.slice(0, 3),
  },
  {
    id: '2',
    name: 'Ho Chi Minh City University of Technology',
    rating: 4.6,
    studentCount: 7200,
    description: 'Leading technology university with modern facilities',
    location: 'Ho Chi Minh City, Vietnam',
    majorCount: 45,
    categories: [
      { label: 'Major', color: 'blue' },
      { label: 'Facility', color: 'green' },
      { label: 'Confession', color: 'purple' },
    ],
    about: 'Ho Chi Minh City University of Technology (HCMUT) is a premier technological institution in Southern Vietnam. Established in 1957, HCMUT has become the leading technology university in the region with a strong focus on engineering, information technology, and applied sciences.\n\nThe university serves over 12,000 students and maintains state-of-the-art facilities including advanced laboratories, innovation centers, and a comprehensive library system. HCMUT is renowned for its industry-academia partnerships and has successfully placed graduates in leading technology companies both domestically and internationally.\n\nKey strengths include specialized programs in civil engineering, electrical engineering, telecommunications, and computer science. The university actively promotes research innovation and entrepreneurship among students, with multiple startup incubators and research centers. HCMUT also emphasizes international collaboration with exchange programs and joint research initiatives.',
    stats: {
      facilities: 4.5,
      teachers: 4.6,
      tuition: 3.8,
    },
    strengths: {
      facilities: 88,
      career: 92,
      social: 80,
      teacher: 86,
    },
    enrollmentTrend: [
      { month: 'Jan', students: 11500 },
      { month: 'Feb', students: 11600 },
      { month: 'Mar', students: 11750 },
      { month: 'Apr', students: 11900 },
      { month: 'May', students: 12000 },
      { month: 'Jun', students: 12100 },
    ],
    reviews: reviewsData.slice(1, 4),
  },
  {
    id: '3',
    name: 'Hanoi University of Science and Technology',
    rating: 4.7,
    studentCount: 9800,
    description: 'Prestigious engineering and science university',
    location: 'Hanoi, Vietnam',
    majorCount: 55,
    categories: [
      { label: 'Major', color: 'blue' },
      { label: 'Facility', color: 'green' },
      { label: 'Confession', color: 'purple' },
    ],
    about: 'Hanoi University of Science and Technology (HUST), formerly known as the Hanoi University of Technology, is one of Vietnam\'s most prestigious engineering and science universities. Founded in 1956, HUST has consistently ranked among the top universities in Vietnam and Southeast Asia for technical education.\n\nWith nearly 10,000 students enrolled across multiple faculties, HUST offers comprehensive programs in engineering, science, technology, and applied sciences. The university maintains strong connections with leading international universities and research institutions, facilitating student exchanges and collaborative research projects.\n\nHUST is recognized for its rigorous curriculum, modern laboratory facilities, and accomplished faculty members who are experts in their respective fields. The university has a strong tradition of innovation and entrepreneurship, with numerous successful alumni leading companies and research organizations globally. Special emphasis is placed on practical training and real-world project experience to prepare graduates for challenging careers in technology and engineering sectors.',
    stats: {
      facilities: 4.6,
      teachers: 4.7,
      tuition: 3.6,
    },
    strengths: {
      facilities: 90,
      career: 90,
      social: 82,
      teacher: 91,
    },
    enrollmentTrend: [
      { month: 'Jan', students: 9300 },
      { month: 'Feb', students: 9400 },
      { month: 'Mar', students: 9500 },
      { month: 'Apr', students: 9650 },
      { month: 'May', students: 9800 },
      { month: 'Jun', students: 9900 },
    ],
    reviews: reviewsData.slice(2, 5),
  },
  {
    id: '4',
    name: 'Foreign Trade University',
    rating: 4.5,
    studentCount: 6500,
    description: 'Premier business and international relations institution',
    location: 'Hanoi, Vietnam',
    majorCount: 38,
    categories: [
      { label: 'Major', color: 'blue' },
      { label: 'Facility', color: 'green' },
      { label: 'Confession', color: 'purple' },
    ],
    about: 'Foreign Trade University (FTU) is Vietnam\'s leading institution dedicated to education in international business, economics, and trade. Founded in 1960, FTU has earned a reputation as a center of excellence in business education with a strong emphasis on global competency and international standards.\n\nWith over 6,500 students, FTU offers specialized programs in international business, economics, finance, and foreign languages. The university maintains partnerships with renowned business schools worldwide, providing students with opportunities for international internships and academic exchanges.\n\nFTU is particularly renowned for developing skilled professionals capable of competing in the global marketplace. The curriculum integrates theoretical knowledge with practical business case studies and real-world industry projects. The university\'s location in Hanoi provides students with access to Vietnam\'s economic hub and numerous networking opportunities with multinational corporations and international organizations.',
    stats: {
      facilities: 4.4,
      teachers: 4.5,
      tuition: 4.0,
    },
    strengths: {
      facilities: 85,
      career: 89,
      social: 88,
      teacher: 85,
    },
    enrollmentTrend: [
      { month: 'Jan', students: 6200 },
      { month: 'Feb', students: 6250 },
      { month: 'Mar', students: 6300 },
      { month: 'Apr', students: 6400 },
      { month: 'May', students: 6500 },
      { month: 'Jun', students: 6600 },
    ],
    reviews: reviewsData.slice(0, 2),
  },
]

export function getUniversityById(id: string): University | undefined {
  return UniversityPageService.getUniversityById(id, universities)
}

export function getCommunityPosts(): CommunityPost[] {
  return UniversityPageService.getSortedCommunityPosts(communityPostsData)
}

export const currentUser: UserProfile = {
  id: 'user-1',
  username: 'Alex Nguyễn',
  email: 'alex.nguyen@hust.edu.vn',
  avatar: '👨‍💻',
  bio: 'Computer Science student at HUST. Passionate about tech and sharing knowledge.',
  isVerified: true,
  isTop100: true,
  joinDate: '2023-09-15',
  totalReviews: 24,
  totalPosts: 18,
  followers: 342,
}

const notificationsData: Notification[] = [
  {
    id: 'notif-1',
    type: 'reply',
    title: 'New reply on your blog post',
    content: 'Someone replied to your post about CS curriculum at HUST',
    author: 'Anonymous User',
    date: '2024-04-22',
    isRead: false,
    blogPostId: 'post-1',
    avatar: '👤',
  },
  {
    id: 'notif-2',
    type: 'reply',
    title: 'New reply on your blog post',
    content: 'Great insights! Totally agree with your thoughts.',
    author: 'Another Student',
    date: '2024-04-21',
    isRead: false,
    blogPostId: 'post-1',
    avatar: '👤',
  },
  {
    id: 'notif-3',
    type: 'like',
    title: 'Someone liked your review',
    content: 'Your review on Engineering courses got 15 likes',
    author: 'System',
    date: '2024-04-20',
    isRead: true,
  },
  {
    id: 'notif-4',
    type: 'follow',
    title: 'New follower',
    content: 'A student started following you',
    author: 'Follower',
    date: '2024-04-19',
    isRead: true,
    avatar: '👤',
  },
  {
    id: 'notif-5',
    type: 'reply',
    title: 'New reply on your blog post',
    content: 'Thanks for sharing this, very helpful!',
    author: 'Student Helper',
    date: '2024-04-18',
    isRead: true,
    blogPostId: 'post-2',
    avatar: '👤',
  },
]

const userActivitiesData: UserActivity[] = [
  {
    id: 'act-1',
    type: 'reply',
    description: 'Replied to HUST Blog',
    target: 'CS Curriculum Discussion',
    date: '2024-04-22',
  },
  {
    id: 'act-2',
    type: 'review',
    description: 'Posted a review on',
    target: 'Computer Science - Prof. Nguyễn',
    date: '2024-04-20',
  },
  {
    id: 'act-3',
    type: 'post',
    description: 'Created a blog post',
    target: 'My Experience at HUST - Month 1',
    date: '2024-04-18',
  },
  {
    id: 'act-4',
    type: 'like',
    description: 'Liked a review on',
    target: 'Business Administration - Dr. Trần',
    date: '2024-04-17',
  },
  {
    id: 'act-5',
    type: 'reply',
    description: 'Replied to HCMUT Blog',
    target: 'Engineering Career Path',
    date: '2024-04-15',
  },
  {
    id: 'act-6',
    type: 'review',
    description: 'Posted a review on',
    target: 'Engineering - Prof. Phạm',
    date: '2024-04-14',
  },
  {
    id: 'act-7',
    type: 'post',
    description: 'Created a blog post',
    target: 'Tips for Passing Difficult Courses',
    date: '2024-04-12',
  },
  {
    id: 'act-8',
    type: 'like',
    description: 'Liked a post on',
    target: 'Campus Life at HUST',
    date: '2024-04-10',
  },
  {
    id: 'act-9',
    type: 'reply',
    description: 'Replied to University Blog',
    target: 'Dormitory Life Experience',
    date: '2024-04-08',
  },
  {
    id: 'act-10',
    type: 'review',
    description: 'Posted a review on',
    target: 'Finance - Dr. Hoàng',
    date: '2024-04-05',
  },
]

export function getNotifications(): Notification[] {
  return notificationsData
}

export function getUnreadNotificationCount(): number {
  return UniversityPageService.getUnreadCount(notificationsData)
}

export function getUserActivities(): UserActivity[] {
  return userActivitiesData
}
