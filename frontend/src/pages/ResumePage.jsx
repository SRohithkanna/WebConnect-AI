import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import UploadFileOutlined from '@mui/icons-material/UploadFileOutlined';
import AutoAwesome from '@mui/icons-material/AutoAwesome';

import { useEffect, useRef, useState } from 'react';

import {
  uploadResume,
  getResume,
  deleteResume,
  analyzeResume,
  getResumeAnalysis,
} from '../api/resumeApi';

const ResumePage = () => {
  const fileInputRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // ---------------------------------------
  // Load existing resume
  // ---------------------------------------
  const loadResume = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getResume();

      console.log('RESUME RESPONSE:', response);

      setResume(response.data || null);
    } catch (error) {
      console.error('Failed to load resume:', error);

      setError(
        error.response?.data?.message ||
          'Unable to load resume.'
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------
  // Load existing analysis
  // ---------------------------------------
  const loadAnalysis = async () => {
    try {
      const response = await getResumeAnalysis();

      console.log('ANALYSIS RESPONSE:', response);

      setAnalysis(response.data || null);
    } catch (error) {
      // 404 simply means analysis doesn't exist yet
      if (error.response?.status !== 404) {
        console.error(
          'Failed to load resume analysis:',
          error
        );
      }
    }
  };

  useEffect(() => {
    loadResume();
    loadAnalysis();
  }, []);

  // ---------------------------------------
  // Upload / Replace resume
  // ---------------------------------------
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    // Important:
    // Reset input so the same file can be selected again
    event.target.value = '';

    if (!file) {
      return;
    }

    console.log('SELECTED FILE:', file);
    console.log('NAME:', file.name);
    console.log('TYPE:', file.type);
    console.log('SIZE:', file.size);

    setError('');
    setMessage('');

    // PDF validation
    if (
      file.type !== 'application/pdf' &&
      !file.name.toLowerCase().endsWith('.pdf')
    ) {
      setError('Only PDF resumes are allowed.');
      return;
    }

    // 5 MB validation
    if (file.size > 5 * 1024 * 1024) {
      setError('Resume size must be less than 5 MB.');
      return;
    }

    try {
      setUploading(true);

      const response = await uploadResume(file);

      console.log(
        'UPLOAD RESPONSE:',
        response
      );

      // Backend returns the newly created/replaced resume
      setResume(response.data || null);

      // Old analysis belongs to old resume
      setAnalysis(null);

      setMessage(
        resume
          ? 'Resume replaced successfully.'
          : 'Resume uploaded successfully.'
      );
    } catch (error) {
      console.error(
        'Failed to upload resume:',
        error
      );

      console.error(
        'BACKEND RESPONSE:',
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
          'Failed to upload resume.'
      );
    } finally {
      setUploading(false);
    }
  };

  // ---------------------------------------
  // Delete resume
  // ---------------------------------------
  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError('');
      setMessage('');

      await deleteResume();

      setResume(null);
      setAnalysis(null);

      setMessage('Resume deleted successfully.');
    } catch (error) {
      console.error(
        'Failed to delete resume:',
        error
      );

      setError(
        error.response?.data?.message ||
          'Failed to delete resume.'
      );
    } finally {
      setDeleting(false);
    }
  };

  // ---------------------------------------
  // Analyze resume
  // ---------------------------------------
  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);
      setError('');
      setMessage('');

      const response = await analyzeResume();

      console.log(
        'ANALYSIS RESPONSE:',
        response
      );

      setResume(response.data || resume);

      setAnalysis(
        response.data?.aiAnalysis || null
      );

      setMessage(
        'Resume analyzed successfully.'
      );
    } catch (error) {
      console.error(
        'Failed to analyze resume:',
        error
      );

      setError(
        error.response?.data?.message ||
          'Failed to analyze resume.'
      );
    } finally {
      setAnalyzing(false);
    }
  };

  // ---------------------------------------
  // Loading
  // ---------------------------------------
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          py: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: 'auto',
        py: 4,
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ mb: 1 }}
      >
        Resume Review
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Upload your resume and get AI-powered
        feedback based on your profile and
        career goals.
      </Typography>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {message && (
        <Alert
          severity="success"
          sx={{ mb: 3 }}
        >
          {message}
        </Alert>
      )}

      {/* -------------------------------- */}
      {/* Upload Card */}
      {/* -------------------------------- */}

      <Card
        sx={{
          borderRadius: 3,
          mb: 3,
        }}
      >
        <CardContent
          sx={{
            p: 4,
          }}
        >
          <Stack
            spacing={2}
            alignItems="center"
          >
            <UploadFileOutlined
              sx={{
                fontSize: 64,
              }}
            />

            <Typography
              variant="h6"
              fontWeight={600}
            >
              {resume
                ? 'Replace your resume'
                : 'Upload your resume'}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              PDF only • Maximum size 5 MB
            </Typography>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              hidden
              onChange={handleFileChange}
            />

            <Button
              variant="contained"
              fullWidth
              startIcon={<UploadFileOutlined />}
              onClick={() =>
                fileInputRef.current?.click()
              }
              disabled={uploading}
              sx={{
                mt: 2,
              }}
            >
              {uploading
                ? 'Uploading...'
                : resume
                  ? 'Replace Resume'
                  : 'Choose Resume'}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* -------------------------------- */}
      {/* Existing Resume */}
      {/* -------------------------------- */}

      {resume && (
        <Card
          sx={{
            borderRadius: 3,
            mb: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ mb: 2 }}
            >
              Current Resume
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography>
              {resume.originalFileName}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Size:{' '}
              {(
                resume.fileSize / 1024
              ).toFixed(1)} KB
            </Typography>

            {resume.createdAt && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Uploaded:{' '}
                {new Date(
                  resume.createdAt
                ).toLocaleString()}
              </Typography>
            )}

            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 3 }}
            >
              <Button
                variant="contained"
                startIcon={<AutoAwesome />}
                onClick={handleAnalyze}
                disabled={analyzing}
              >
                {analyzing
                  ? 'Analyzing...'
                  : 'Analyze Resume'}
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting
                  ? 'Deleting...'
                  : 'Delete'}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* -------------------------------- */}
      {/* AI Analysis */}
      {/* -------------------------------- */}

      {analysis && (
        <Card
          sx={{
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ mb: 3 }}
            >
              AI Resume Analysis
            </Typography>

            {analysis.summary && (
              <>
                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  Summary
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ mt: 1, mb: 3 }}
                >
                  {analysis.summary}
                </Typography>
              </>
            )}

            {analysis.strengths?.length > 0 && (
              <>
                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  Strengths
                </Typography>

                <Box
                  component="ul"
                  sx={{ mb: 3 }}
                >
                  {analysis.strengths.map(
                    (item, index) => (
                      <li key={index}>
                        <Typography>
                          {item}
                        </Typography>
                      </li>
                    )
                  )}
                </Box>
              </>
            )}

            {analysis.weaknesses?.length > 0 && (
              <>
                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  Weaknesses
                </Typography>

                <Box
                  component="ul"
                  sx={{ mb: 3 }}
                >
                  {analysis.weaknesses.map(
                    (item, index) => (
                      <li key={index}>
                        <Typography>
                          {item}
                        </Typography>
                      </li>
                    )
                  )}
                </Box>
              </>
            )}

            {analysis.missingSkills?.length >
              0 && (
              <>
                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  Missing Skills
                </Typography>

                <Box
                  component="ul"
                  sx={{ mb: 3 }}
                >
                  {analysis.missingSkills.map(
                    (item, index) => (
                      <li key={index}>
                        <Typography>
                          {item}
                        </Typography>
                      </li>
                    )
                  )}
                </Box>
              </>
            )}

            {analysis.interviewFocusAreas
              ?.length > 0 && (
              <>
                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  Interview Focus Areas
                </Typography>

                <Box component="ul">
                  {analysis.interviewFocusAreas.map(
                    (item, index) => (
                      <li key={index}>
                        <Typography>
                          {item}
                        </Typography>
                      </li>
                    )
                  )}
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ResumePage;