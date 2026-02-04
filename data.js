const collegeData = {
  mba: [
    {
      id: "iimb",
      name: "Indian Institute of Management Bangalore (IIMB)",
      shortName: "IIM Bangalore",
      location: "Bannerghatta Road, Bengaluru, Karnataka 560076",
      placement: {
        average: "₹ 33.7 LPA",
        highest: "₹ 1.15 Crore LPA"
      },
      fees: "₹ 24 - 25 Lakhs (Full Program)",
      exams: "CAT",
      website: "https://www.iimb.ac.in",
      image: "Mba/Mba_1.jpg", // Ensure this path is correct relative to the HTML file using it
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.321295405378!2d77.55966207405832!3d12.896350118631665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae157fc013c5cf%3A0x2bfa3df3b478cf29!2sIndian%20Institute%20of%20Management%20Bangalore!5e0!3m2!1sen!2sin!4v1692781687463!5m2!1sen!2sin",
      description: "Established in 1973, IIM Bangalore is one of India's most prestigious management institutes, known globally for excellence in management education, research, and leadership development. Nestled in a lush green 100-acre campus designed by the legendary architect B.V. Doshi, IIMB fosters innovation, entrepreneurship, and academic rigor.",
      features: [
        "World-class faculty and research-driven pedagogy.",
        "Top global partnerships with universities for student exchange.",
        "State-of-the-art infrastructure and one of India's most beautiful campuses.",
        "Strong alumni network with leaders in consulting, tech, and finance."
      ],
      minRank: 1,
      maxRank: 10
    },
    {
      id: "christ",
      name: "Christ University",
      shortName: "Christ University",
      location: "Hosur Road, Bangalore",
      placement: {
        average: "₹ 7 LPA",
        highest: "₹ 15 LPA"
      },
      fees: "₹ 2,00,000 per year",
      exams: "MAT, CAT, CMAT, XAT",
      website: "https://christuniversity.in",
      image: "Mba/Mba_2.jpg", // Placeholder
      mapUrl: "", // Add map URL if available
      description: "Christ University is a deemed to be university in Bangalore, Karnataka, India. Founded in 1969 as Christ College, the University Grants Commission (UGC) of India declared Christ College a Deemed to be University, pursuant to Section 3 of the UGC Act 1956, in 2008.",
      features: [
        "Holistic education.",
        "Green campus.",
        "Diverse student community."
      ],
      minRank: 801,
      maxRank: 1200
    },
    {
      id: "rvce",
      name: "RV College of Engineering",
      shortName: "RV College",
      location: "Mysore Road, Bangalore",
      placement: {
        average: "₹ 8 LPA",
        highest: "₹ 20 LPA"
      },
      fees: "₹ 3,50,000 per year",
      exams: "PGCET, KMAT",
      website: "https://rvce.edu.in",
      image: "Mba/Mba_3.jpg",
      mapUrl: "",
      description: "Rashtreeya Vidyalaya College of Engineering is a private technical co-educational college located in Bangalore, Karnataka, India. RVCE is recognized as a center of excellence under the Technical Education Quality Improvement Programme by the Government of India.",
      features: ["Excellent placements", "Research focused"],
      minRank: 1,
      maxRank: 60
    }
    // Add other colleges here following the schema
  ],
  mca: [
    {
      id: "rvce-mca",
      name: "RV College of Engineering (RVCE)",
      shortName: "RVCE MCA",
      // ... detailed info
    }
  ],
  // Add other courses
};

// Export for module usage (if using modules) or just global if simple script inclusion
if (typeof module !== 'undefined') {
  module.exports = collegeData;
}
