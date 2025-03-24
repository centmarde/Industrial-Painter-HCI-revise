export interface InterviewData {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  location: string;
  candidateName: string;
  position: string;
  color?: string;
}

export const interviewData: InterviewData[] = [
  {
    id: '1',
    title: 'Interview with John Doe',
    start: new Date(2023, 10, 15, 10, 0),
    end: new Date(2023, 10, 15, 11, 0),
    description: 'First round technical interview',
    location: 'Meeting Room A',
    candidateName: 'John Doe',
    position: 'Senior Paint Technician',
    color: '#FB8500',
  },
  {
    id: '2',
    title: 'Interview with Jane Smith',
    start: new Date(2023, 10, 16, 14, 0),
    end: new Date(2023, 10, 16, 15, 30),
    description: 'HR interview for final selection',
    location: 'Meeting Room B',
    candidateName: 'Jane Smith',
    position: 'Project Manager',
    color: '#FFB703',
  },
  {
    id: '3',
    title: 'Interview with Mike Johnson',
    start: new Date(2023, 10, 17, 9, 0),
    end: new Date(2023, 10, 17, 10, 0),
    description: 'First screening call',
    location: 'Phone Interview',
    candidateName: 'Mike Johnson',
    position: 'Junior Painter',
    color: '#FF9D33',
  },
  {
    id: '4',
    title: 'Interview with Sarah Williams',
    start: new Date(2023, 10, 18, 13, 0),
    end: new Date(2023, 10, 18, 14, 0),
    description: 'Technical assessment',
    location: 'Meeting Room C',
    candidateName: 'Sarah Williams',
    position: 'Industrial Paint Specialist',
    color: '#FB8500',
  },
  {
    id: '5',
    title: 'Interview with Robert Brown',
    start: new Date(2023, 10, 19, 11, 0),
    end: new Date(2023, 10, 19, 12, 0),
    description: 'Final interview with CEO',
    location: 'Executive Office',
    candidateName: 'Robert Brown',
    position: 'Operations Manager',
    color: '#FFB703',
  },
  {
    id: '6',
    title: 'Interview with Emily Davis',
    start: new Date(2023, 10, 22, 10, 30),
    end: new Date(2023, 10, 22, 11, 30),
    description: 'Portfolio review',
    location: 'Meeting Room A',
    candidateName: 'Emily Davis',
    position: 'Design Specialist',
    color: '#FF9D33',
  },
  {
    id: '7',
    title: 'Interview with James Wilson',
    start: new Date(2023, 10, 23, 14, 0),
    end: new Date(2023, 10, 23, 15, 0),
    description: 'Technical skills assessment',
    location: 'Workshop Area',
    candidateName: 'James Wilson',
    position: 'Senior Painter',
    color: '#FB8500',
  },
  {
    id: '8',
    title: 'Interview with Maria Garcia',
    start: new Date(2023, 10, 24, 9, 30),
    end: new Date(2023, 10, 24, 10, 30),
    description: 'First round interview',
    location: 'Meeting Room B',
    candidateName: 'Maria Garcia',
    position: 'Quality Control Specialist',
    color: '#FFB703',
  }
];
