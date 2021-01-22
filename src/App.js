import React from "react";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import {
  PagingInfo,
  ResultsPerPage,
  Paging,
  Facet,
  SearchProvider,
  Results,
  SearchBox,
  Sorting,
  BooleanFacet,
  SingleSelectFacet,
  SingleLinksFacet
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";

import "@elastic/react-search-ui-views/lib/styles/styles.css";


// Step #2, The Connector
const connector = new AppSearchAPIConnector({
  searchKey: "search-wovubcsma6jqj1dseq97uyi9",
  engineName: "uva-classes-v5",
  hostIdentifier: "host-fradkb"
});
// Step #3: Configurationnpm 
const configurationOptions = {
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true,
  // disjunctiveFacets: ["acres", "states", "date_established", "location"],
  autocompleteQuery: {
    suggestions: {
      types: {
        documents: {
          // Which fields to search for suggestions.
          fields: ["title"]
        }
      },
      // How many suggestions appear.
      size: 5
    }
  },
  searchQuery: {
    search_fields: {
      // 1. Search by name of video game.
      title: {}
    },

    result_fields: {
      title: {
        // A snippet means that matching search terms will be highlighted via <em> tags.
        snippet: {
          size: 75, // Limit the snippet to 75 characters.
          fallback: true // Fallback to a "raw" result.
        }
      },
      type: {
        snippet: {
          size: 50,
          fallback: true
        }
      }
      ,
      days_full: {
        snippet: {
          size: 50,
          fallback: true
        }
      },
      number: {
        raw: {}
      },
      description: {
        snippet: {
          size: 400,
          fallback: true
        }
      },
      new_reqs_multi: {
        snippet: {
          size: 400,
          fallback: true
        }
      },
      old_reqs_multi: {
        snippet: {
          size: 400,
          fallback: true
        }
      },
      units: {
        raw: {}
      },
      mnemonic: {
        snippet: {
          size: 50,
          fallback: true
        }
      }
    },
    facets: {
      units: {
        type: "range",
        ranges: [
          { from: 0, to: 1, name: "1" },
          { from: 1, to: 2, name: "2" },
          { from: 2, to: 3, name: "3" },
          { from: 3, to: 4, name: "4" }
        ]
      },
      number: {
        type: "range",
        ranges: [
          { from: 0, to: 1999, name: "1000 level" },
          { from: 2000, to: 2999, name: "2000 level" },
          { from: 3000, to: 3999, name: "3000 level" },
          { from: 4000, to: 10000, name: "4000 level and above" }
        ]
      },
      type: { type: "value", size: 100 },
      days_full: { type: "value", size: 100 },
      mnemonic: { type: "value", size: 100 },
      dayofweek: { type: "value", size: 100 },
      start_time: { type: "value", size: 100 },
      end_time: { type: "value", size: 100 },
      instructor: { type: "value", size: 100 },
      room: { type: "value", size: 100 },
      instructionmode: { type: "value", size: 100 },
      new_reqs_multi: { type: "value", size: 100 },
      old_reqs_multi: { type: "value", size: 100 },
    }
  }
};                                                                                                                                                                                                                                                                                                                                                                 
// Step #4, SearchProvider
export default function App() {
  return (
    
    <SearchProvider config={configurationOptions}>
      <div className="App">
      <Layout
  header={<SearchBox autocompleteSuggestions={true} />}
  bodyContent={<Results titleField="title"  />} // urlField="image_url" />}
  sideContent={
    <div>
      <p3> Notes + todo </p3>

      <ul>
        <li> Click search to display filters/classes </li>
        <li> Need custom lists like CS integration electives </li>
        <li> Add class GPA data, avg professor gpa etc </li>
        <li> If requirement combination isn't listed, it doesn't exist </li>
        <li> disjunctive facets = can select multiple checkboxes </li>
        <li> make drop downs, figure out how to hide results </li>
        {/* https://codesandbox.io/s/national-parks-example-kdyms?fontsize=14&file=/src/App.js:1176-1232 */}
      </ul>
      <Sorting
        label={"Sort by"}
        sortOptions={[
          {
            name: "Relevance",
            value: "",
            direction: ""
          },
          {
            name: "Name",
            value: "title",
            direction: "asc"
          }
        ]}
      />

      <Facet field="type" label="Type" filterType="any" />
      <Facet field="mnemonic" label="Category" />
      <h1>New Requirements</h1> 
      <p1> If combination is not listed, it probably doesn't exist </p1>
      <Facet field="new_reqs_multi" label="Multi-Requirement search" isFilterable={true} />
      <h1>Old Requirements</h1> 
      <p1> If combination is not listed, it probably doesn't exist </p1>
      <Facet field="old_reqs_multi" label="Multi-Requirement search" isFilterable={true} />

      {/* <Facet field="days_full" label="DAYZ [days]" isFilterable={true} /> */}
      <Facet field="dayofweek" label="Day of Week" />
      <Facet field="start_time" label="Start Time" />
      <Facet field="end_time" label="End Time" />
      <Facet field="instructionmode" label="Instruction Mode" />

      <Facet field="instructor" label="Instructor" isFilterable={true} />
      <Facet field="room" label="Building" />
      <Facet field="units" label="Credits" />
      <Facet field="number" label="Course Level" />

    </div>
  }
  bodyHeader={
    <>
      <PagingInfo />
      <ResultsPerPage />
    </>
  }
  bodyFooter={<Paging />}
/>
      </div>
    </SearchProvider>
  );
}