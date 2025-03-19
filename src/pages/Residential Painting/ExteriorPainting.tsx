import React from 'react';
import OutsideLayout from '../../layout/OutsideLayout';
import { useThemeContext } from '../../context/ThemeContext';
import { 
  Box, 
  Typography, 
  Paper, 
  Container,
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Button,
  useTheme
} from '@mui/material';
import './ExteriorPainting.css';
import Icon from '@mui/material/Icon';
import CTASection from '../../common/CTASection';

const ExteriorPainting: React.FC = () => {
    const { mode } = useThemeContext();
    const isDark = mode === 'dark';
    const theme = useTheme();

    // Fixed card dimensions with explicit width and height
    const cardStyles = {
        height: 400, // Fixed height in pixels
        width: '100%', 
        display: 'flex',
        flexDirection: 'column',
    };

    // Smaller cards for process and projects sections
    const smallerCardStyles = {
        height: 350, // Fixed height in pixels
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    };

    const cardMediaStyles = {
        height: 200, // Fixed height for image portion
        width: '100%',
        objectFit: 'cover'
    };

    const cardContentStyles = {
        flexGrow: 1,
        backgroundColor: isDark ? theme.palette.background.paper : '#fff',
        padding: '16px',
        // Remove overflow: auto
    };

    // Typography styles for cards to ensure text fits without scrolling
    const cardTitleStyles = {
        color: isDark ? theme.palette.text.primary : 'inherit',
        fontSize: '1.1rem', // Smaller font size for title
        fontWeight: 'medium',
        mb: 1
    };

    const cardTextStyles = {
        color: isDark ? theme.palette.text.secondary : 'inherit',
        fontSize: '0.85rem', // Smaller font size for content
        lineHeight: 1.4
    };


    // Grid wrapper style to ensure fixed width containers
    const gridItemStyles = {
        display: 'flex',
        justifyContent: 'center',
    };

    // Paper wrapper to control overall sizing
    const paperStyles = {
        width: '100%',
        height: '100%',
        display: 'flex',
    };

    return (
        <OutsideLayout>
            <section className={`hero-section ${isDark ? 'hero-dark' : ''}`}>
                <Container>
                    <Typography 
                        variant="h2" 
                        className="text-center mb-4" 
                        sx={{ color: isDark ? '#fff' : 'inherit', textAlign: 'center', mb: 4 }}
                    >
                        Exterior House Painting Services
                    </Typography>
                    <Typography 
                        variant="h5" 
                        sx={{ color: isDark ? '#e0e0e0' : 'inherit', textAlign: 'center', mb: 5 }}
                    >
                        Transform your home's appearance with our professional exterior painting services
                    </Typography>
                </Container>
            </section>

            <Box className="services-section py-5" sx={{ backgroundColor: isDark ? theme.palette.background.default : '#fff', py: 5 }}>
               <Container>
    <Typography 
        variant="h3" 
        className="section-title text-center mb-5"
        sx={{ color: isDark ? '#fff' : 'inherit', textAlign: 'center', mb: 5 }}
    >
        Our Exterior Painting Services
    </Typography>
    <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={4} sx={gridItemStyles}>
            <Paper elevation={isDark ? 3 : 1} className={`service-card h-100 ${isDark ? 'dark-card' : ''}`} sx={paperStyles}>
                <Card sx={cardStyles}>
                    <CardMedia
                        component="img"
                        sx={cardMediaStyles}
                        image="/images/exteriorPainting/housepaint.jpg"
                        alt="House Painting"
                    />
                    <CardContent sx={cardContentStyles}>
                        <Typography variant="h5" sx={cardTitleStyles}>
                            <Icon>home</Icon> Complete House Painting
                        </Typography>
                        <Typography sx={cardTextStyles}>
                            Full exterior painting services to revitalize your home's appearance and protect it from the elements.
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={gridItemStyles}>
            <Paper elevation={isDark ? 3 : 1} className={`service-card h-100 ${isDark ? 'dark-card' : ''}`} sx={paperStyles}>
                <Card sx={cardStyles}>
                    <CardMedia
                        component="img"
                        sx={cardMediaStyles}
                        image="/images/exteriorPainting/trim.jpg"
                        alt="Trim Painting"
                    />
                    <CardContent sx={cardContentStyles}>
                        <Typography variant="h5" sx={cardTitleStyles}>
                            <Icon>format_paint</Icon> Trim & Detail Work
                        </Typography>
                        <Typography sx={cardTextStyles}>
                            Precision painting for window frames, door frames, soffits, fascia, and architectural details.
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={gridItemStyles}>
            <Paper elevation={isDark ? 3 : 1} className={`service-card h-100 ${isDark ? 'dark-card' : ''}`} sx={paperStyles}>
                <Card sx={cardStyles}>
                    <CardMedia
                        component="img"
                        sx={cardMediaStyles}
                        image="/images/exteriorPainting/staining.jpg"
                        alt="Deck Staining"
                    />
                    <CardContent sx={cardContentStyles}>
                        <Typography variant="h5" sx={cardTitleStyles}>
                            <Icon>deck</Icon> Deck & Fence Staining
                        </Typography>
                        <Typography sx={cardTextStyles}>
                            Professional staining and sealing for decks, fences, and other outdoor wooden structures.
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
    </Grid>
</Container>
            </Box>

            <Box className="process-section py-5" sx={{ backgroundColor: isDark ? '#1e1e1e' : '#f5f5f5', py: 5 }}>
                <Container>
                    <Typography 
                        variant="h3" 
                        className="section-title text-center mb-5"
                        sx={{ color: isDark ? '#fff' : 'inherit', textAlign: 'center', mb: 5 }}
                    >
                        Our Exterior Painting Process
                    </Typography>
                    <Grid container spacing={4}>
                        {[
                            {
                                title: "1. Inspection & Preparation",
                                text: "Thorough assessment of surfaces, identification of repairs needed, and protection of surrounding areas.",
                                img: "/images/exteriorPainting/proc1.jpg"
                            },
                            {
                                title: "2. Cleaning & Repairs",
                                text: "Pressure washing, scraping, sanding, and repairing damaged surfaces for optimal paint adhesion.",
                                img: "/images/exteriorPainting/proc2.jpeg"
                            },
                            {
                                title: "3. Priming & Sealing",
                                text: "Application of high-quality primers and sealants to create a perfect foundation for the paint.",
                                img: "/images/exteriorPainting/proc3.jpg"
                            },
                            {
                                title: "4. Painting & Finishing",
                                text: "Expert application of premium paints with careful attention to detail and thorough clean-up.",
                                img: "/images/exteriorPainting/proc4.PNG"
                            }
                        ].map((step, index) => (
                            <Grid item key={index} xs={12} md={6} lg={3} sx={gridItemStyles}>
                                <Paper elevation={isDark ? 3 : 1} className={`process-card h-100 ${isDark ? 'dark-card' : ''}`} sx={paperStyles}>
                                    <Card sx={smallerCardStyles}>
                                        <CardMedia
                                            component="img"
                                            sx={cardMediaStyles}
                                            image={step.img}
                                            alt={step.title}
                                        />
                                        <CardContent sx={cardContentStyles}>
                                            <Typography variant="h5" sx={cardTitleStyles}>
                                                {step.title}
                                            </Typography>
                                            <Typography sx={cardTextStyles}>
                                                {step.text}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Services Types Section */}
            <Box className="services-types py-5" sx={{ backgroundColor: isDark ? '#121212' : '#fff', py: 5 }}>
                <Container>
                    <Typography 
                        variant="h3" 
                        className="section-title text-center mb-5"
                        sx={{ color: isDark ? '#fff' : 'inherit', textAlign: 'center', mb: 5 }}
                    >
                        Types of Exterior Painting Services
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6} sx={gridItemStyles}>
                            <Paper elevation={isDark ? 3 : 1} className={`service-type-card h-100 ${isDark ? 'dark-card' : ''}`} sx={paperStyles}>
                                <Card sx={cardStyles}>
                                    <CardMedia
                                        component="img"
                                        sx={cardMediaStyles}
                                        image="/images/exteriorPainting/type1.jpeg"
                                        alt="Residential Painting"
                                    />
                                    <CardContent sx={cardContentStyles}>
                                        <Typography variant="h5" sx={cardTitleStyles}>
                                            Residential
                                        </Typography>
                                        <Box component="ul" sx={{ 
                                            color: isDark ? theme.palette.text.secondary : 'inherit',
                                          
                                        }}>
                                            <Typography sx={cardTextStyles} component="p">
                                               Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, assumenda magnam quas temporibus provident ab. Quisquam animi nobis necessitatibus? Provident, natus debitis saepe doloremque aliquid libero dignissimos perspiciatis minima accusamus.
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} sx={gridItemStyles}>
                            <Paper elevation={isDark ? 3 : 1} className={`service-type-card h-100 ${isDark ? 'dark-card' : ''}`} sx={paperStyles}>
                                <Card sx={cardStyles}>
                                    <CardMedia
                                        component="img"
                                        sx={cardMediaStyles}
                                        image="/images/exteriorPainting/type2.jpeg"
                                        alt="Specialty Surfaces"
                                    />
                                    <CardContent sx={cardContentStyles}>
                                        <Typography variant="h5" sx={cardTitleStyles}>
                                            Specialty Surfaces
                                        </Typography>
                                        <Box component="ul" sx={{ color: isDark ? theme.palette.text.secondary : 'inherit' }}>
                                        <Typography sx={cardTextStyles} component="p">
                                               Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, assumenda magnam quas temporibus provident ab. Quisquam animi nobis necessitatibus? Provident, natus debitis saepe doloremque aliquid libero dignissimos perspiciatis minima accusamus.
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Repairs Section */}
            <Box className="repairs-section py-5" sx={{ backgroundColor: isDark ? '#1e1e1e' : '#f5f5f5', py: 5 }}>
                <Container>
                    <Typography 
                        variant="h3" 
                        className="section-title text-center mb-5"
                        sx={{ color: isDark ? '#fff' : 'inherit', textAlign: 'center', mb: 5 }}
                    >
                        Repairs With Your Exterior Painting Project
                    </Typography>
                    <Grid container spacing={4}>
                        {[
                            {
                                title: "Wood Repair",
                                text: "Replacement of rotted wood, siding repair, and structural fixes before painting.",
                                img: "/images/exteriorPainting/repair1.png"
                            },
                            {
                                title: "Caulking & Sealing",
                                text: "Professional sealing of gaps, cracks, and joints to prevent water damage and improve energy efficiency.",
                                img: "/images/exteriorPainting/repair2.jpg"
                            },
                            {
                                title: "Stucco & Siding Repair",
                                text: "Fixing damaged stucco, siding replacement, and surface preparation for optimal results.",
                                img: "/images/exteriorPainting/repair3.jpeg"
                            }
                        ].map((repair, index) => (
                            <Grid item key={index} xs={12} md={4} sx={gridItemStyles}>
                                <Paper elevation={isDark ? 3 : 1} className={`repair-card h-100 ${isDark ? 'dark-card' : ''}`} sx={paperStyles}>
                                    <Card sx={cardStyles}>
                                        <CardMedia
                                            component="img"
                                            sx={cardMediaStyles}
                                            image={repair.img}
                                            alt={repair.title}
                                        />
                                        <CardContent sx={cardContentStyles}>
                                            <Typography variant="h5" sx={cardTitleStyles}>
                                                {repair.title}
                                            </Typography>
                                            <Typography sx={cardTextStyles}>
                                                {repair.text}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Projects Section */}
            <Box className="projects-section py-5" sx={{ backgroundColor: isDark ? '#121212' : '#fff', py: 5 }}>
                <Container>
                    <Typography 
                        variant="h3" 
                        className="section-title text-center mb-5"
                        sx={{ color: isDark ? '#fff' : 'inherit', textAlign: 'center', mb: 5 }}
                    >
                        Exterior Painting Projects Completed
                    </Typography>
                    <Grid container spacing={4}>
                        {[
                            {
                                title: "Modern Farmhouse",
                                text: "Complete exterior transformation with modern color palette",
                                img: "/images/exteriorPainting/r1.jpg"
                            },
                            {
                                title: "Colonial Restoration",
                                text: "Historic home revitalization with period-appropriate colors",
                                img: "/images/exteriorPainting/r2.jpg"
                            },
                            {
                                title: "Ranch Renovation",
                                text: "Complete exterior update with modern trim accents",
                                img: "/images/exteriorPainting/r3.jpg"
                            },
                            {
                                title: "Contemporary Design",
                                text: "Bold color choices for a striking modern appearance",
                                img: "/images/exteriorPainting/r4.jpg"
                            }
                        ].map((project, index) => (
                            <Grid item key={index} xs={12} md={4} lg={3} sx={gridItemStyles}>
                                <Paper elevation={isDark ? 3 : 1} className={`project-card ${isDark ? 'dark-card' : ''}`} sx={paperStyles}>
                                    <Card sx={smallerCardStyles}>
                                        <CardMedia
                                            component="img"
                                            sx={cardMediaStyles}
                                            image={project.img}
                                            alt={project.title}
                                        />
                                        <CardContent sx={cardContentStyles}>
                                            <Typography variant="h5" sx={cardTitleStyles}>
                                                {project.title}
                                            </Typography>
                                            <Typography sx={cardTextStyles}>
                                                {project.text}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <CTASection 
                title="Ready to Transform Your Home's Exterior?"
                subtitle="Contact us today for a free consultation and estimate"
                buttonText="Get a Free Quote"
                onButtonClick={() => console.log('Quote button clicked')}
            />
        </OutsideLayout>
    );
};

export default ExteriorPainting;
