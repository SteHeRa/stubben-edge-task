import React, { useEffect, useState, useCallback } from "react"
import {
  Typography,
  CircularProgress,
  Grid,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  Button,
} from "@mui/material"
import { useQuery } from "react-query"
import { useForm } from "react-hook-form"
import capitalsService, {
  Capital,
  CapitalsResponse,
} from "../../services/capitalsService"

type FormInputs = {
  capitalOption: string
}

interface CorrectAnswerState {
  isAnswerCorrect: boolean
  correctAnswer: string
  chosenAnswer: string
}

function shuffleArr<T>(arr: T[]): T[] {
  // Shuffle capitals and get first 3 items
  return arr.sort(() => 0.5 - Math.random())
}

const Question = () => {
  const { data, error, isLoading, isFetching, isError, refetch } = useQuery(
    "capitals",
    capitalsService.getCapitals
  )

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitted, isSubmitSuccessful },
    reset,
  } = useForm<FormInputs>()

  const onSubmit = (formData: FormInputs) => {
    const correctCapital = answerPool.find((capital) => {
      return capital.name === country
    })

    if (!correctCapital) {
      throw new Error("Can't find country")
    }

    if (formData.capitalOption === correctCapital.capital) {
      //Correct! show positive message and generate new question
      setCorrectAnswerState({
        isAnswerCorrect: true,
        correctAnswer: correctCapital.capital,
        chosenAnswer: formData.capitalOption,
      })
      return
    }

    // Incorrect! Show correct answer and allow trying again
    setCorrectAnswerState({
      isAnswerCorrect: false,
      correctAnswer: correctCapital.capital,
      chosenAnswer: formData.capitalOption,
    })
    return
  }

  const generateSubmittedAnswerSymbol = (option: string): string => {
    if (isSubmitSuccessful) {
      if (option === correctAnswerState?.correctAnswer) {
        return " ✅"
      }
      if (option === correctAnswerState?.chosenAnswer) {
        return " ❌"
      }
    }
    return ""
  }

  const [country, setCountry] = useState<string | undefined>(undefined)
  const [options, setOptions] = useState<string[]>([])
  const [answerPool, setAnswerPool] = useState<Capital[]>([])
  const [correctAnswerState, setCorrectAnswerState] =
    useState<CorrectAnswerState | null>(null)
  const [networkErrorMessage, setNetworkErrorMessage] = useState<
    string | undefined
  >(undefined)

  const generateQuestion = useCallback((data: CapitalsResponse) => {
    const { data: capitals } = data

    // Shuffle capitals and get first 3 items
    const answerPool = shuffleArr(capitals).slice(0, 3)
    setAnswerPool(answerPool)
    setCountry(answerPool[0].name)
    const options = shuffleArr(answerPool).map(({ capital }) => capital)

    setOptions(options)
  }, [])

  useEffect(() => {
    if (isError) {
      if (error instanceof Error) {
        setNetworkErrorMessage(error.message)
      } else {
        setNetworkErrorMessage(
          "There was an error getting the capital city data! Please try refreshing your page!"
        )
      }
    }
    if (data) {
      generateQuestion(data)
    }
  }, [data, error, isError, generateQuestion])

  return (
    <Grid container item xs={12} justifyContent="center" alignItems="center">
      {isLoading || isFetching ? (
        <CircularProgress />
      ) : (
        <Grid
          item
          container
          xs={8}
          justifyContent="center"
          alignItems="center"
          spacing={6}
        >
          <Grid item xs={12}>
            <Typography variant="h3">{`What is the capital of ${country}?`}</Typography>
          </Grid>
          <Grid item container xs={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={12}>
                  <FormControl>
                    <RadioGroup name="capitalOption">
                      {options.map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          color="success"
                          control={<Radio color="success" />}
                          label={`${option}${generateSubmittedAnswerSymbol(
                            option
                          )}`}
                          disabled={isSubmitSuccessful}
                          {...register("capitalOption", { required: true })}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item container xs={12} gap={3}>
                  <Grid xs="auto">
                    <Button
                      variant="contained"
                      onClick={handleSubmit(onSubmit)}
                      disabled={isSubmitSuccessful}
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid xs="auto">
                    {isSubmitSuccessful && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          reset()
                          setCorrectAnswerState(null)
                          refetch()
                        }}
                      >
                        New Question
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12}>
            {isSubmitted && formErrors.capitalOption?.type === "required" && (
              <Typography variant="h5">You must select an option!</Typography>
            )}
            {isSubmitSuccessful ? (
              correctAnswerState?.isAnswerCorrect ? (
                <Typography variant="h5">✅ Correct!</Typography>
              ) : (
                <Typography variant="h5">❌ Incorrect!</Typography>
              )
            ) : null}
            {networkErrorMessage && (
              <Typography variant="h5">{networkErrorMessage}</Typography>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default Question
