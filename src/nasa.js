import React, { Component } from "react";

async function NasaService(date) {
  try {
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=ryKeedeRejmebUmDh57G3jeiUi3emyj3d467ioGM&date=${date}`;
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (e) {
    console.error("Error", e);
  }
}

class NasaApi extends Component {
  state = {
    error: null,
    loading: false,
    date: "",
    title: "",
    url: "",
    explanation: "",
  };

  componentDidMount() {
    this.getDataFromService("2020-02-02");
  }

  getDataFromService = (date) => {
    this.setState({ loading: true });
    NasaService(date).then((result) => {
      this.setState({
        date: result.date,
        title: result.title,
        url: result.url,
        explanation: result.explanation,
      });
    });
    this.setState({ loading: false });
  };

  render() {
    const { loading, date, title, url, explanation } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    } else {
      return (
        <div className="d-flex flex-column">
          <div>
            <h1 className=" text-center">NASA API</h1>
          </div>
          <div className="d-flex justify-content-around">
            <input
              className="w-25 "
              onChange={(e) => this.getDataFromService(e.target.value)}
              type="date"
              value={date}
            />
            <h3>{title}</h3>
          </div>
          <div className="d-flex">
            <div className="w-50">
              <img className="w-100 p-2" src={url} />
            </div>
            <div className="w-50">
              <p className="p-2">{explanation}</p>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default NasaApi;
