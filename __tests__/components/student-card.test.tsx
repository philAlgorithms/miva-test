import StudentCard, { IStudentCard } from '@/components/card/StudentCard';
import { mockStudent } from '@/lib/mock';
import { render, screen } from '@testing-library/react';

describe('StudentCard Component', () => {
  const defaultProps: IStudentCard = {
    student: mockStudent,
  };

  it('should render student name', () => {
    render(<StudentCard {...defaultProps} />);
    expect(screen.getByText(mockStudent.name)).toBeInTheDocument();
  });

  it('should render student major', () => {
    render(<StudentCard {...defaultProps} />);
    expect(screen.getByText('Major')).toBeInTheDocument();
    expect(screen.getByText(mockStudent.major)).toBeInTheDocument();
  });

  it('should render student GPA', () => {
    render(<StudentCard {...defaultProps} />);
    expect(screen.getByText('GPA')).toBeInTheDocument();
    expect(screen.getByText(mockStudent.gpa.toString())).toBeInTheDocument();
  });

  it('should pass down extra props', () => {
    render(
      <StudentCard
        {...defaultProps}
        data-testid="student-card"
        className="test-class"
      />
    );
    expect(screen.getByTestId('student-card')).toBeInTheDocument();
    expect(screen.getByTestId('student-card')).toHaveClass('test-class');
  });
});
