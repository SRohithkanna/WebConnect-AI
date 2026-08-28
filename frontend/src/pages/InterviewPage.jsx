import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import QuestionAnswerOutlined from '@mui/icons-material/QuestionAnswerOutlined';

import {
  useEffect,
  useState,
} from 'react';

import {
  generateInterviewQuestions,
  getLatestInterview,
} from '../api/interviewApi.js';

const InterviewPage = () => {

  const [questions, setQuestions] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const [checkedQuestions, setCheckedQuestions] =
    useState({});

useEffect(() => {
  const loadInterview = async () => {
    try {
      const response =
        await getLatestInterview();

      setQuestions(
        response.data?.questions || []
      );

    } catch (error) {
      if (
        error?.response?.status !== 404
      ) {
        console.error(
          'Failed to load interview:',
          error
        );

        setError(
          error?.response?.data?.message ||
            'Unable to load interview questions.'
        );
      }
    }
  };

  loadInterview();
}, []);
  // ---------------------------------------
  // Generate questions
  // ---------------------------------------

  const handleGenerate =
    async () => {

      try {

        setLoading(true);
        setError('');

        const response =
          await generateInterviewQuestions();

        console.log(
          'INTERVIEW RESPONSE:',
          response
        );

        setQuestions(
          response.data?.questions ||
          []
        );

        setCheckedQuestions({});

      } catch (error) {

        console.error(
          'Failed to generate interview questions:',
          error
        );

        setError(
          error?.response?.data?.message ||
          'Unable to generate interview questions.'
        );

      } finally {

        setLoading(false);

      }
    };


  // ---------------------------------------
  // Checkbox
  // ---------------------------------------

  const handleCheck =
    (index) => {

      setCheckedQuestions(
        (previous) => ({
          ...previous,
          [index]:
            !previous[index],
        })
      );
    };


  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: 'auto',
        py: 2,
      }}
    >

      {/* -------------------------------- */}
      {/* Header */}
      {/* -------------------------------- */}

      <Box sx={{ mb: 4 }}>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >

          <QuestionAnswerOutlined
            sx={{
              color: 'primary.main',
            }}
          />

          <Typography
            variant="h4"
            fontWeight={700}
          >
            Interview Preparation
          </Typography>

        </Box>


        <Typography
          color="text.secondary"
          sx={{
            mt: 1,
            maxWidth: 750,
            lineHeight: 1.7,
          }}
        >
          Practice interview questions generated
          specifically from your profile, skills,
          projects, and resume.
        </Typography>

      </Box>


      {/* -------------------------------- */}
      {/* Error */}
      {/* -------------------------------- */}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}


      {/* -------------------------------- */}
      {/* Generate Card */}
      {/* -------------------------------- */}

      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
        }}
      >

        <CardContent sx={{ p: 3 }}>

          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={2}
            alignItems={{
              xs: 'flex-start',
              sm: 'center',
            }}
            justifyContent="space-between"
          >

            <Box>

              <Typography
                variant="h6"
                fontWeight={600}
              >
                Prepare for your interview
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Generate personalized questions
                and interview-ready answers.
              </Typography>

            </Box>


            <Button
              variant="contained"
              startIcon={
                loading ? (
                  <CircularProgress
                    size={18}
                    color="inherit"
                  />
                ) : (
                  <AutoAwesome />
                )
              }
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading
                ? 'Generating...'
                : questions.length > 0
                  ? 'Generate Again'
                  : 'Generate Questions'}
            </Button>

          </Stack>

        </CardContent>

      </Card>


      {/* -------------------------------- */}
      {/* Loading */}
      {/* -------------------------------- */}

      {loading && (
        <Card>

          <CardContent
            sx={{
              minHeight: 250,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >

            <Stack
              spacing={2}
              alignItems="center"
            >

              <CircularProgress />

              <Typography
                color="text.secondary"
              >
                Creating interview questions
                from your resume...
              </Typography>

            </Stack>

          </CardContent>

        </Card>
      )}


      {/* -------------------------------- */}
      {/* Empty */}
      {/* -------------------------------- */}

      {!loading &&
        questions.length === 0 && (
          <Card>

            <CardContent
              sx={{
                py: 8,
                textAlign: 'center',
              }}
            >

              <QuestionAnswerOutlined
                sx={{
                  fontSize: 52,
                  color: 'text.secondary',
                  mb: 2,
                }}
              />

              <Typography
                variant="h6"
                fontWeight={600}
              >
                No questions generated yet
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 1,
                  mb: 3,
                }}
              >
                Click "Generate Questions" to
                start your interview preparation.
              </Typography>

            </CardContent>

          </Card>
        )}


      {/* -------------------------------- */}
      {/* Questions */}
      {/* -------------------------------- */}

      {!loading &&
        questions.length > 0 && (

          <Stack spacing={1.5}>

            {questions.map(
              (item, index) => (

                <Accordion
                  key={index}
                  disableGutters
                  sx={{
                    borderRadius: 2,
                    '&:before': {
                      display: 'none',
                    },
                  }}
                >

                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon />
                    }
                    sx={{
                      px: 2,
                      py: 1,
                    }}
                  >

                    <Checkbox
                      checked={
                        Boolean(
                          checkedQuestions[index]
                        )
                      }
                      onChange={() =>
                        handleCheck(index)
                      }
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                      onFocus={(event) =>
                        event.stopPropagation()
                      }
                    />


                    <Box
                      sx={{
                        flex: 1,
                        pr: 2,
                      }}
                    >

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 0.5,
                        }}
                      >

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          Question {index + 1}
                        </Typography>

                        {item.category && (
                          <Chip
                            label={item.category}
                            size="small"
                            variant="outlined"
                          />
                        )}

                      </Box>


                      <Typography
                        fontWeight={600}
                        sx={{
                          lineHeight: 1.6,
                        }}
                      >
                        {item.question}
                      </Typography>

                    </Box>

                  </AccordionSummary>


                  <AccordionDetails
                    sx={{
                      px: 3,
                      pb: 3,
                      pt: 1,
                    }}
                  >

                    <Box
                      sx={{
                        ml: {
                          xs: 0,
                          sm: 7,
                        },
                        p: 2.5,
                        borderRadius: 2,
                        bgcolor:
                          'rgba(255,255,255,0.03)',
                        border:
                          '1px solid rgba(255,255,255,0.08)',
                      }}
                    >

                      <Typography
                        variant="subtitle2"
                        fontWeight={700}
                        color="primary.main"
                        sx={{ mb: 1 }}
                      >
                        Interview Answer
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.8,
                        }}
                      >
                        {item.answer}
                      </Typography>

                    </Box>

                  </AccordionDetails>

                </Accordion>

              )
            )}

          </Stack>

        )}

    </Box>
  );
};


export default InterviewPage;