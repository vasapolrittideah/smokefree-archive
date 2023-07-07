package test

import (
	"bytes"
	"encoding/json"
	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	"io"
	"log"
	"net/http/httptest"
	"testing"
)

type HandlerTestCase struct {
	Name         string
	Method       string
	URL          string
	Body         interface{}
	WantStatus   int
	WantResponse interface{}
}

func HTTPEndpoint(t *testing.T, app *fiber.App, tc HandlerTestCase) {
	t.Run(tc.Name, func(t *testing.T) {
		body, err := json.Marshal(tc.Body)
		assert.NoError(t, err)

		req := httptest.NewRequest(tc.Method, tc.URL, bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")

		resp, _ := app.Test(req)
		body, _ = io.ReadAll(resp.Body)

		assert.Equal(t, tc.WantStatus, resp.StatusCode)
		if tc.WantResponse != nil {
			data, err := json.Marshal(tc.WantResponse)
			if err != nil {
				log.Fatalln("unable to marshal JSON")
			}
			assert.Equal(t, data, body)
		}
	})
}
