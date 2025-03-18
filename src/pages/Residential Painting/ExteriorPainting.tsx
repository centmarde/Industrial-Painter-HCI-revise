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

    // Styles for list items in cards
    const listItemStyles = {
        fontSize: '0.85rem',
        lineHeight: 1.4,
        mb: 0.5
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
                                        image="/images/exterior/house-painting.jpg"
                                        alt="House Painting"
                                    />
                                    <CardContent sx={cardContentStyles}>
                                        <Typography variant="h5" sx={cardTitleStyles}>
                                            Complete House Painting
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
                                        image="/images/exterior/trim-painting.jpg"
                                        alt="Trim Painting"
                                    />
                                    <CardContent sx={cardContentStyles}>
                                        <Typography variant="h5" sx={cardTitleStyles}>
                                            Trim & Detail Work
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
                                        image="/images/exterior/deck-painting.jpg"
                                        alt="Deck Staining"
                                    />
                                    <CardContent sx={cardContentStyles}>
                                        <Typography variant="h5" sx={cardTitleStyles}>
                                            Deck & Fence Staining
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
                                img: "/images/process/inspection.jpg"
                            },
                            {
                                title: "2. Cleaning & Repairs",
                                text: "Pressure washing, scraping, sanding, and repairing damaged surfaces for optimal paint adhesion.",
                                img: "/images/process/cleaning.jpg"
                            },
                            {
                                title: "3. Priming & Sealing",
                                text: "Application of high-quality primers and sealants to create a perfect foundation for the paint.",
                                img: "/images/process/priming.jpg"
                            },
                            {
                                title: "4. Painting & Finishing",
                                text: "Expert application of premium paints with careful attention to detail and thorough clean-up.",
                                img: "/images/process/painting.jpg"
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
                                        image="/images/types/residential.jpg"
                                        alt="Residential Painting"
                                    />
                                    <CardContent sx={cardContentStyles}>
                                        <Typography variant="h5" sx={cardTitleStyles}>
                                            Residential
                                        </Typography>
                                        <Box component="ul" sx={{ 
                                            color: isDark ? theme.palette.text.secondary : 'inherit',
                                            pl: 2, // Reduce padding for list
                                            mt: 1
                                        }}>
                                            <Box component="li" sx={listItemStyles}>Single-family homes</Box>
                                            <Box component="li" sx={listItemStyles}>Townhouses and condos</Box>
                                            <Box component="li" sx={listItemStyles}>Multi-family properties</Box>
                                            <Box component="li" sx={listItemStyles}>Historic home restoration</Box>
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
                                        image="/images/types/speciality.jpg"
                                        alt="Specialty Surfaces"
                                    />
                                    <CardContent sx={cardContentStyles}>
                                        <Typography variant="h5" sx={cardTitleStyles}>
                                            Specialty Surfaces
                                        </Typography>
                                        <Box component="ul" sx={{ color: isDark ? theme.palette.text.secondary : 'inherit' }}>
                                            <Box component="li" sx={listItemStyles}>Brick and stucco surfaces</Box>
                                            <Box component="li" sx={listItemStyles}>Vinyl and aluminum siding</Box>
                                            <Box component="li" sx={listItemStyles}>Cedar shingles and wood siding</Box>
                                            <Box component="li" sx={listItemStyles}>Metal surfaces and gutters</Box>
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
                                img: "/images/repairs/wood-repair.jpg"
                            },
                            {
                                title: "Caulking & Sealing",
                                text: "Professional sealing of gaps, cracks, and joints to prevent water damage and improve energy efficiency.",
                                img: "/images/repairs/caulking.jpg"
                            },
                            {
                                title: "Stucco & Siding Repair",
                                text: "Fixing damaged stucco, siding replacement, and surface preparation for optimal results.",
                                img: "/images/repairs/stucco.jpg"
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
                                img: "/images/projects/project1.jpg"
                            },
                            {
                                title: "Colonial Restoration",
                                text: "Historic home revitalization with period-appropriate colors",
                                img: "/images/projects/project2.jpg"
                            },
                            {
                                title: "Ranch Renovation",
                                text: "Complete exterior update with modern trim accents",
                                img: "/images/projects/project3.jpg"
                            },
                            {
                                title: "Contemporary Design",
                                text: "Bold color choices for a striking modern appearance",
                                img: "/images/projects/project4.jpg"
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
            <Box 
                className="cta-section py-5" 
                sx={{ 
                    backgroundColor: isDark ? theme.palette.primary.dark : theme.palette.primary.main,
                    color: '#fff',
                    py: 5
                }}
            >
                <Container sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ mb: 4 }}>
                        Ready to Transform Your Home's Exterior?
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4 }}>
                        Contact us today for a free consultation and estimate
                    </Typography>
                    <Button 
                        variant={isDark ? "outlined" : "contained"}
                        size="large"
                        sx={{ 
                            borderColor: isDark ? '#fff' : undefined,
                            color: isDark ? '#fff' : theme.palette.primary.contrastText,
                            bgcolor: isDark ? 'transparent' : theme.palette.secondary.main,
                            '&:hover': {
                                bgcolor: isDark ? 'rgba(255,255,255,0.1)' : theme.palette.secondary.dark
                            }
                        }}
                    >
                        Get a Free Quote
                    </Button>
                </Container>
            </Box>
        </OutsideLayout>
    );
};

export default ExteriorPainting;
